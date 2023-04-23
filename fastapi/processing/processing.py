from myclass.problem import ProblemData
from langchain.chat_models import ChatOpenAI
from processing.problem.summary_info import summary_info
from processing.problem.summary_description import summary_description

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
        
        