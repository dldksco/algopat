from myclass.problem import ProblemData
from langchain.chat_models import ChatOpenAI
from processing.problem.summary_info import summary_info
from processing.problem.summary_description import summary_description
from processing.usercode.summary_code_complexity import summary_code_complexity
from processing.usercode.summary_code_refactor import summary_code_refactor
from myparser.problem.parse_summary import parse_summary
from myparser.usercode.parse_summary_code import parse_summary_code
from asyncio import gather
from logging import getLogger
from chain.json_formatter.json_formatter import json_formatter

# logger 설정 
logger = getLogger()

# GPT 응답 생성 함수
async def processing(data : ProblemData):

    open_brace = '{'
    close_brace = '}'
    if (True):
        chat_llm_0 = ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key, request_timeout=120)
        # chat_llm_1 = ChatOpenAI(temperature=0.1, openai_api_key=data.openai_api_key)
        chat_llm_3 = ChatOpenAI(temperature=0.3, openai_api_key=data.openai_api_key, request_timeout=120)
        # chat_llm_10 = ChatOpenAI(temperature=1, openai_api_key=data.openai_api_key)
        
        json_chain = await json_formatter(chat_llm_0)

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
        
        return summary_code_json
    
        
        