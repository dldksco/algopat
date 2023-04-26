from langchain.chat_models import ChatOpenAI
from myclass.problem import ProblemData
from utils.utils import count_token
from chain.problem.summary_description import summary_description_chain
from chain.problem.summary_description_long import summary_description_long_chain
from langchain.text_splitter import TokenTextSplitter

async def summary_description(chat_llm : ChatOpenAI, data : ProblemData, problem_info : str):
    problem_description_origin = data.problem_description
    token_length = await count_token(problem_description_origin)
    print(token_length)
    if (token_length < 2000):
        return await summary_description_short(chat_llm, problem_info, problem_description_origin)
    else:
        return await summary_description_long(chat_llm, problem_info, problem_description_origin)
        
async def summary_description_short(chat_llm : ChatOpenAI, problem_info : str, problem_description_origin : str):

    chain = await summary_description_chain(chat_llm)
    summary_description_result = await chain.arun(
        problem_info = problem_info,
        problem_description_origin = problem_description_origin
        )
    return summary_description_result
    
async def summary_description_long(chat_llm : ChatOpenAI, problem_info : str, problem_description_origin : str):

    chain = await summary_description_long_chain(chat_llm)
    text_splitter = TokenTextSplitter(chunk_size=1000, chunk_overlap=0, encoding_name="cl100k_base")
    texts = text_splitter.split_text(problem_description_origin)

    first_text = ""
    second_text = ""
    existing_summary = ""
    texts_len = len(texts)
    for i in range(texts_len):
        print(f"iter_count = {i + 1}/{texts_len}, token: {await count_token(texts[i])}")
        if i > 0:
            first_text = texts[i - 1]
        second_text = texts[i]
        existing_summary = await chain.arun(
            problem_info = problem_info,
            existing_summary = existing_summary,
            first_text = first_text,
            second_text = second_text
            )
    summary = existing_summary
    return summary