from langchain import LLMChain
from prompt.usercode.summary_code_refactor_long_prompt import SUMMARY_CODE_REFACTORING_LONG

async def summary_code_refactor_long_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_CODE_REFACTORING_LONG)
    return chain