from langchain import LLMChain
from prompt.problem.summary_description_long_prompt import SUMMARY_PROMPT_DESCRIPTION_LONG

# Chain : 문제 요약 (2000토큰 초과)
async def summary_description_long_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_PROMPT_DESCRIPTION_LONG)
    return chain