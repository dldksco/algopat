from langchain import LLMChain
from prompt.problem.summary_info_long_prompt import SUMMARY_PROMPT_INFO_LONG

# Chain : 문제 정보 요약 (2000토큰 초과)
async def summary_info_long_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_PROMPT_INFO_LONG)
    return chain