from pydantic import BaseModel
from typing import List

class ProblemData(BaseModel):
    openai_api_key: str
    elementId: str
    submissionId: str
    username: str
    problemId: str
    result: str
    memory: str
    runtime: str
    language: str
    codeLength: str
    submissionTime: str
    resultCategory: str
    title: str
    level: str
    code: str
    problem_description: str
    problem_input: str
    problem_output: str
    problem_tags: List[str]
    problem_limit: List[str]
    problem_info_space_limit: str
    problem_info_time_limit: str