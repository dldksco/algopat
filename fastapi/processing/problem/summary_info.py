from langchain.chat_models import ChatOpenAI
from myclass.problem import ProblemData
from utils.utils import count_token
from chain.problem.summary_info import summary_info_chain
from chain.problem.summary_info_long import summary_info_long_chain
from langchain.text_splitter import TokenTextSplitter
from logging import getLogger

# logger 설정 
logger = getLogger()

async def summary_info(chat_llm : ChatOpenAI, data : ProblemData):
    problem_info_origin = await build_problem_info_origin(data)
    token_length = await count_token(problem_info_origin)
    logger.info(token_length)
    if token_length < 2000:
        return await summary_info_short(chat_llm, problem_info_origin)
    else:
        return await summary_info_long(chat_llm, problem_info_origin)

async def summary_info_short(chat_llm : ChatOpenAI, problem_info_origin : str):
    chain = await summary_info_chain(chat_llm)
    summary_info_result = await chain.arun(problem_info_origin = problem_info_origin)
    return summary_info_result

async def summary_info_long(chat_llm : ChatOpenAI, problem_info_origin : str):
    chain = await summary_info_long_chain(chat_llm)
    text_splitter = TokenTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_text(problem_info_origin)
    
    first_text = ""
    second_text = ""
    existing_summary = ""
    texts_len = len(texts)
    for i in range(texts_len):
        logger.info(f"iter_count = {i + 1}/{texts_len}, token: {await count_token(texts[i])}")
        if i > 0:
            first_text = texts[i - 1]
        second_text = texts[i]
        existing_summary = await chain.arun(
            first_text = first_text,
            second_text = second_text,
            existing_summary = existing_summary
            )
    summary = existing_summary
    return summary

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