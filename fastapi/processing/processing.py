from myclass.problem import ProblemData
from langchain.chat_models import ChatOpenAI
from processing.problem.summary_info import summary_info
from processing.problem.summary_description import summary_description
from processing.usercode.summary_code_complexity import summary_code_complexity
from myparser.problem.parse_summary import parse_summary
import logging

# logger 설정 
logger = logging.getLogger()

# GPT 응답 생성 함수
async def processing(data : ProblemData):

    if (True):
        chat_llm_0 = ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key)
        # chat_llm_1 = ChatOpenAI(temperature=0.1, openai_api_key=data.openai_api_key)
        chat_llm_3 = ChatOpenAI(temperature=0.3, openai_api_key=data.openai_api_key)
        # chat_llm_10 = ChatOpenAI(temperature=1, openai_api_key=data.openai_api_key)

        # 문제 요약 정보 생성 
        summary_info_result = await summary_info(chat_llm_0, data)
        logger.info("크롤링 문제 정보 요약 : " + summary_info_result)

        # 문제 요약 정보를 참고하여 모범 답안 생성 (시간 복잡도, 공간 복잡도)
        summary_description_result = await summary_description(chat_llm_0, data, summary_info_result)
        logger.info("문제 정보 요약: " + summary_description_result)
        summary_text = f"problem_id = {data.problemId}\n {summary_info_result} \n {summary_description_result}"

        summary_json = await parse_summary(chat_llm_0, summary_text)


        logger.info("json 타입으로 변환: " + summary_json)

        summary_code_complexity_result = await summary_code_complexity(chat_llm_0, data, summary_json)

        
        return summary_code_complexity_result
    
        
        