from langchain import LLMChain
from prompt.usercode.summary_code_complexity_prompt import SUMMARY_CODE_COMPLEXITY

async def summary_code_complexity_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_CODE_COMPLEXITY)
    return chain