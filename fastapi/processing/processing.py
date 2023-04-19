from myclass.problem import ProblemData
from utils.utils import count_token
from langchain.chat_models import ChatOpenAI
from chain.problem.summary_info import summary_info_chain

async def processing(data):
    if (True):
        chat_llm = ChatOpenAI(temperature=0, openai_api_key=data.openai_api_key)
        problem_info_origin = await build_problem_info_origin(data)
        token_length = await count_token(problem_info_origin)
        print(token_length)
        if token_length < 2000:
            chain = await summary_info_chain(chat_llm)
            summary_info_result = await chain.arun(problem_info_origin = problem_info_origin)
            print(summary_info_result)
        
async def build_problem_info_origin(data : ProblemData):
    problem_info_origin = f" \
        입력 : {data.problem_input} \n\
        출력 : {data.problem_output} \n\
        문제 제약조건 : {data.problem_limit} \n\
        문제 유형 : {data.problem_tags} \n\
        문제 시간제한 : {data.problem_info_time_limit} \n\
        문제 공간제한 : {data.problem_info_space_limit} \n\
    "
    return problem_info_origin
        