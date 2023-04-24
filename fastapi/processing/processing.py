from myclass.problem import ProblemData
from langchain.chat_models import ChatOpenAI
from processing.problem.summary_info import summary_info
from processing.problem.summary_description import summary_description
from processing.usercode.summary_code_complexity import summary_code_complexity
from parser.problem.parse_summary import parse_summary

async def processing(data : ProblemData):
    if (True):
        # 문제 요약 정보 생성 
        summary_info_result = await summary_info(await create_chat_llm(0, data), data)
        print("문제 요약 정보임 : \n", summary_info_result)

        # 문제 요약 정보를 참고하여 모범 답안 생성 (시간 복잡도, 공간 복잡도)
        summary_description_result = await summary_description(await create_chat_llm(0, data), data, summary_info_result)
        print(summary_description_result)
        summary_text = f"problem_id = {data.problemId}\n {summary_info_result} \n {summary_description_result}"
        summary_json = await parse_summary(await create_chat_llm(0, data), summary_text)
        summary_code_complexity_result = await summary_code_complexity(await create_chat_llm(0, data), data, summary_json)
        return summary_code_complexity_result
    
        
async def create_chat_llm(temperature : int, data : ProblemData):
    return ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key, request_timeout=3600)