from myclass.problem import ProblemData
from langchain.chat_models import ChatOpenAI
from processing.problem.summary_info import summary_info
from processing.problem.summary_description import summary_description
from processing.usercode.summary_code_complexity import summary_code_complexity
from parser.problem.parse_summary import parse_summary

async def processing(data : ProblemData):
    if (True):
        chat_llm_0 = ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key)
        # chat_llm_1 = ChatOpenAI(temperature=0.1, openai_api_key=data.openai_api_key)
        chat_llm_3 = ChatOpenAI(temperature=0.3, openai_api_key=data.openai_api_key)
        # chat_llm_10 = ChatOpenAI(temperature=1, openai_api_key=data.openai_api_key)
        summary_info_result = await summary_info(chat_llm_0, data)
        print(summary_info_result)
        summary_description_result = await summary_description(chat_llm_0, data, summary_info_result)
        print(summary_description_result)
        summary_text = f"problem_id = {data.problemId}\n {summary_info_result} \n {summary_description_result}"
        summary_json = await parse_summary(chat_llm_0, summary_text)
        summary_code_complexity_result = await summary_code_complexity(chat_llm_0, data, summary_json)
        return summary_code_complexity_result
    
        
        