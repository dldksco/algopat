from pydantic import BaseModel, Field
from typing import List

class ProblemData(BaseModel):

    # def __init__(self, dictionary):
    #     for key, value in dictionary.items():
    #         setattr(self, key, value)

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
    
class ProblemSummary(BaseModel):
    problem_id: int = Field(description="problem identifier")
    gpt_problem_summary_description: str = Field(description="problem description")
    gpt_problem_summary_input: str = Field(description="problem input information")
    gpt_problem_summary_constraints: str = Field(description="detailed input scope")
    gpt_problem_summary_output: str = Field(description="problem output information, including detailed scope")
    gpt_time_complexity: str = Field(description="problem time complexity")
    gpt_time_complexity_reason: str = Field(description="reason for the time complexity")
    gpt_space_complexity: str = Field(description="problem space complexity")
    gpt_space_complexity_reason: str = Field(description="reason for the space complexity")
    problem_space_limit: str = Field(description="problem space limit")
    problem_time_limit: str = Field(description="problem time limit")
    problem_algorithm_type: str = Field(description="problem algorithm type")

class DictToClass:
    def __init__(self, dictionary):
        for key, value in dictionary.items():
            setattr(self, key, value)