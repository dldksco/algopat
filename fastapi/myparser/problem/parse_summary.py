from pydantic import BaseModel, Field
from typing import List
from langchain import LLMChain
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from langchain.output_parsers import OutputFixingParser
from myclass.problem import ProblemSummary

async def parse_summary(llm : LLMChain, text : str):
    parser = PydanticOutputParser(pydantic_object=ProblemSummary)
    new_parser = OutputFixingParser.from_llm(parser=parser, llm=llm)
    formed_data = new_parser.parse(text)

    print("======================= 파서 결과 입니다 =========================================")
    print(formed_data)
    print("=================================================================================")
    return formed_data
    
    

