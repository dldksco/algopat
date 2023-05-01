from langchain import LLMChain
from prompt.usercode.summary_code_refactor_prompt import SUMMARY_CODE_REFACTORING

async def summary_code_refactor_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_CODE_REFACTORING)
    return chain