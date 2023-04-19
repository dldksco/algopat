from langchain import LLMChain
from prompt.problem.summary_info_prompt import SUMMARY_PROMPT_INFO

async def summary_info_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_PROMPT_INFO)
    return chain