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
from logging import getLogger
from chain.json_formatter.json_formatter import json_formatter

from database.problem import insert_problem, insert_gpt_problem_summary, insert_user_submit_problem, get_problem, get_gpt_problem_summary, UserSubmitProblem, UserSubmitSolution, insert_user_submit_solution, GPTSolution, insert_gpt_solution
from database.get_session import get_session

# logger 설정 
logger = getLogger()

# GPT 응답 생성 함수
async def processing(data : ProblemData):

    open_brace = '{'
    close_brace = '}'
    chat_llm_0 = ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key, request_timeout=120)
    # chat_llm_1 = ChatOpenAI(temperature=0.1, openai_api_key=data.openai_api_key)
    chat_llm_3 = ChatOpenAI(temperature=0.3, openai_api_key=data.openai_api_key, request_timeout=120)
    # chat_llm_10 = ChatOpenAI(temperature=1, openai_api_key=data.openai_api_key)
    json_chain = await json_formatter(chat_llm_0)
    if (True):

        ### 문제 DB 접근 ### 
        logger.info("문제 DB 접근")
        problem_id = data.problemId
        if await get_problem(problem_id, await get_session()) == True:
            logger.info("문제 DB 저장")
            await insert_problem(data, await get_session())

        ### 회원 제출 DB 접근 ### 
        logger.info("회원 제출 DB 접근")
        userSubmitProblemData = UserSubmitProblem(
            problem_id = problem_id,
            user_seq = 9999 # Todo : user_seq를 넘겨 받을 예정 
        )
        logger.info("회원 제출 DB 저장")
        user_submit_problem_seq = await insert_user_submit_problem(userSubmitProblemData, await get_session())

        logger.info("회원 제출 코드 DB 접근")
        ### 회원 제출 코드 DB 접근 ### 
        UserSubmitSolutionData = UserSubmitSolution(
            user_submit_problem_seq = user_submit_problem_seq,
            # user_submit_solution_time = data.submissionTime,
            user_submit_solution_result = data.result,
            user_submit_solution_result_category = data.resultCategory,
            user_submit_solution_language = data.language,
            user_submit_solution_code = data.code,
            user_submit_solution_runtime = data.runtime,
            user_submit_solution_memory = data.memory,
            problem_id = problem_id
        )
        logger.info("회원 제출 코드 DB 저장")
        user_submit_solution_seq = await insert_user_submit_solution(UserSubmitSolutionData, await get_session())



        # 문제 요약 정보 생성 
        logger.info("크롤링 문제 정보 요약 시작")
        summary_info_result = await summary_info(chat_llm_0, data)
        logger.info("크롤링 문제 정보 요약 완료")

        # 문제 요약 정보를 참고하여 모범 답안 생성 (시간 복잡도, 공간 복잡도)
        logger.info("문제 설명 요약 시작")
        summary_description_result = await summary_description(chat_llm_0, data, summary_info_result)
        logger.info("문제 설명 요약 완료")
        
        logger.info("json 타입으로 변환 시작")
        summary_text = f"{open_brace}'problem_id': {data.problemId}\n {summary_info_result} \n {summary_description_result}\n{close_brace}" 
        preprocessed_summary = await json_chain.arun(data = summary_text)
        summary_json = await parse_summary(chat_llm_0, preprocessed_summary)
        logger.info("json 타입으로 변환 완료")


        ### GPT_문제 요약 DB 접근 ###
        logger.info("GPT 문제 요약 DB 접근")
        if await get_gpt_problem_summary(problem_id, await get_session()) == True:
            logger.info("GPT 문제 요약 DB 저장 ")
            await insert_gpt_problem_summary(summary_json, await get_session())


        logger.info("코드 요약 시작")
        summary_code_complexity_coroutine = summary_code_complexity(chat_llm_0, data, summary_json)
        summary_code_refactor_coroutine = summary_code_refactor(chat_llm_0, data, summary_json)
        summary_code_complexity_result, summary_code_refactor_result = await gather(summary_code_complexity_coroutine, summary_code_refactor_coroutine)
        logger.info("코드 요약 완료")
        
        logger.info("코드 요약 json 타입으로 변환 시작")
        summary_code_text = f"{open_brace}{summary_code_complexity_result}\n {summary_code_refactor_result}\n total_score: 0\n{close_brace}"
        logger.info(summary_code_text)
        preprocessed_summary_code = await json_chain.arun(data = summary_code_text)
        logger.info(preprocessed_summary_code)
        summary_code_json = await parse_summary_code(chat_llm_0, preprocessed_summary_code)
        logger.info("코드 요약 json 타입으로 변환 완료")


        ### GPT평가 DB 접근 ### 
        logger.info("GPT평가 DB 접근")
        GPTSolutionData = GPTSolution(
            user_submit_solution_seq = user_submit_solution_seq,
            gpt_solution_time_complexity = summary_code_json.gpt_solution_time_complexity,
            gpt_solution_time_complexity_reason = summary_code_json.gpt_solution_time_complexity_reason,
            gpt_solution_time_score = summary_code_json.gpt_solution_time_score,
            gpt_solution_time_complexity_good_point = summary_code_json.gpt_solution_time_complexity_good_point,
            gpt_solution_time_complexity_bad_point = summary_code_json.gpt_solution_time_complexity_bad_point,
            gpt_improving_time_complexity_suggestion = summary_code_json.gpt_improving_time_complexity_suggestion,
            gpt_solution_space_complexity = summary_code_json.gpt_solution_space_complexity,
            gpt_solution_space_complexity_reason = summary_code_json.gpt_solution_space_complexity_reason,
            gpt_solution_space_score = summary_code_json.gpt_solution_space_score,
            gpt_solution_space_complexity_good_point = summary_code_json.gpt_solution_space_complexity_good_point,
            gpt_solution_space_complexity_bad_point = summary_code_json.gpt_solution_space_complexity_bad_point,
            gpt_improving_space_complexity_suggestion = summary_code_json.gpt_improving_space_complexity_suggestion,
            gpt_solution_clean_score = summary_code_json.gpt_solution_clean_score,
            gpt_solution_refactoring_suggestion = summary_code_json.gpt_solution_refactoring_suggestion,
            total_score = summary_code_json.total_score
        )
        logger.info("GPT평가 DB 저장")
        await insert_gpt_solution(GPTSolutionData, await get_session())
        
        logger.info("데이터 번역 작업 시작")
        result = await translate_texts(chat_llm_0, summary_code_json)
        logger.info("데이터 번역 작업 완료")
        result.total_score = (result.gpt_solution_time_score + result.gpt_solution_space_score + result.gpt_solution_clean_score) // 3
        
        return result
    
        
        