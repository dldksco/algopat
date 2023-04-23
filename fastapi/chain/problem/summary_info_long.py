from langchain import LLMChain
from prompt.problem.summary_info_long_prompt import SUMMARY_PROMPT_INFO_LONG

async def summary_info_long_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_PROMPT_INFO_LONG)
    return chain