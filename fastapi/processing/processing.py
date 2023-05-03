from myclass.problem import ProblemData
from langchain.chat_models import ChatOpenAI
from processing.problem.summary_info import summary_info
from processing.problem.summary_description import summary_description
from processing.usercode.summary_code_complexity import summary_code_complexity
from processing.usercode.summary_code_refactor import summary_code_refactor
from processing.translator.translate_text import translate_texts
from myparser.problem.parse_summary import parse_summary
from myparser.usercode.parse_summary_code import parse_summary_code
from asyncio import gather
from chain.json_formatter.json_formatter import json_formatter
from database.problem import    check_gpt_problem_summary_is_exist
from database.database import save_problem_origin \
                            , save_user_problem_origin \
                            , save_problem_summary \
                            , save_user_submit_solution_origin \
                            , save_gpt_solution \
                            , check_gpt_problem_summary_is_exist \
                            , get_gpt_problem_summary
from aioredlock import Aioredlock, LockError
from asyncio import sleep
from logging import getLogger
from utils.log_decorator import time_logger
from utils.shared_env import redis_url

# logger 설정 
logger = getLogger()

OPEN_BRACE = '{'
CLOSE_BRACE = '}'

LOCK_TIMEOUT = 500000


# GPT 응답 생성 함수
@time_logger("GPT 비즈니스 로직")
async def processing(data : ProblemData):
    lock_manager = Aioredlock([redis_url])
    
    chat_llm_0 = ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key, request_timeout=120)
    # chat_llm_1 = ChatOpenAI(temperature=0.1, openai_api_key=data.openai_api_key)
    chat_llm_3 = ChatOpenAI(temperature=0.3, openai_api_key=data.openai_api_key, request_timeout=120)
    # chat_llm_10 = ChatOpenAI(temperature=1, openai_api_key=data.openai_api_key)
    json_chain = await json_formatter(chat_llm_0)
    
    problem_id = data.problemId
    lock = None
    while True:
        lock = await lock_manager.lock(f"problem_id:{problem_id}", LOCK_TIMEOUT)
        if lock.valid:
            await summary_problem(problem_id, data, chat_llm_0, json_chain)
            break
        else:
            while await lock_manager.is_locked(f"problem_id:{problem_id}"):
                await sleep(1)
    if lock and lock.valid:
        logger.info("언락")
        await lock_manager.unlock(lock)
    await lock_manager.destroy()
    ### 회원 푼 문제 DB 접근 ### 
    user_submit_problem_seq = await save_user_problem_origin(problem_id)
    user_submit_solution_seq = await save_user_submit_solution_origin(user_submit_problem_seq, problem_id, data)
    
    # 여기서 DB에서 불러오는 로직이 들어가는거
    gpt_problem_summary = await get_gpt_problem_summary(problem_id)

    logger.info("코드 요약 시작")
    summary_code_complexity_coroutine = summary_code_complexity(chat_llm_0, data, gpt_problem_summary)
    summary_code_refactor_coroutine = summary_code_refactor(chat_llm_0, data, gpt_problem_summary)
    summary_code_complexity_result, summary_code_refactor_result = await gather(summary_code_complexity_coroutine, summary_code_refactor_coroutine)
    logger.info("코드 요약 완료")
    
    logger.info("코드 요약 json 타입으로 변환 시작")
    summary_code_text = f"{OPEN_BRACE}{summary_code_complexity_result}\n {summary_code_refactor_result}\n total_score: 0\n{CLOSE_BRACE}"
    preprocessed_summary_code = await json_chain.arun(data = summary_code_text)
    summary_code_json = await parse_summary_code(chat_llm_0, preprocessed_summary_code)
    logger.info("코드 요약 json 타입으로 변환 완료")

    logger.info("데이터 번역 작업 시작")
    result = await translate_texts(chat_llm_0, summary_code_json)
    logger.info("데이터 번역 작업 완료")
    result.total_score = (result.gpt_solution_time_score + result.gpt_solution_space_score + result.gpt_solution_clean_score) // 3
    
    ### GPT평가 DB 접근 ### 
    await save_gpt_solution(user_submit_solution_seq, result)
    
    return result

async def summary_problem(problem_id : str, data : ProblemData, chat_llm, json_chain):
    is_gpt_problem_summary_exist = await check_gpt_problem_summary_is_exist(problem_id)
    if not is_gpt_problem_summary_exist:
        ### 문제 DB에 문제 저장### 
        await save_problem_origin(problem_id, data)
        
        # 문제 요약 정보 생성 
        summary_info_result = await summary_info(chat_llm, data)

        # 문제 요약 정보를 참고하여 모범 답안 생성 (시간 복잡도, 공간 복잡도)
        summary_description_result = await summary_description(chat_llm, data, summary_info_result)
        
        summary_text = f"{OPEN_BRACE}'problem_id': {data.problemId}\n {summary_info_result} \n {summary_description_result}\n{CLOSE_BRACE}" 
        logger.info("문제 요약 정보 전처리")
        preprocessed_summary = await json_chain.arun(data = summary_text)
        summary_json = await parse_summary(chat_llm, preprocessed_summary)

        ### GPT_문제 요약 DB 접근 ###
        await save_problem_summary(problem_id, summary_json)