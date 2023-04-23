from langchain import LLMChain
from prompt.problem.summary_description_prompt import SUMMARY_PROMPT_DESCRIPTION

async def summary_description_chain(llm):
    chain = LLMChain(llm = llm, prompt = SUMMARY_PROMPT_DESCRIPTION)
    return chain