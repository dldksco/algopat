from langchain import LLMChain
from prompt.usercode.summary_code_complexity_long_prompt import SUMMARY_CODE_COMPLEXITY_LONG

async def summary_code_complexity_long_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_CODE_COMPLEXITY_LONG)
    return chain