from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

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
    
class ProblemSummary(BaseModel):
    problem_id: Optional[int] = None
    gpt_problem_summary_description: Optional[str] = None
    gpt_problem_summary_input: Optional[str] = None
    gpt_problem_summary_constraints: Optional[str] = None
    gpt_problem_summary_output: Optional[str] = None
    gpt_time_complexity: Optional[str] = None
    gpt_time_complexity_reason: Optional[str] = None
    gpt_space_complexity: Optional[str] = None
    gpt_space_complexity_reason: Optional[str] = None
    problem_space_limit: Optional[str] = None
    problem_time_limit: Optional[str] = None
    problem_algorithm_type: Optional[str] = None

class UserSubmitProblem(BaseModel):
    user_submit_problem_seq : int 
    problem_id : str
    user_seq : int 
    user_submit_problem_created_at : date 

class UserSubmitSolution(BaseModel):
    user_submit_solution_seq : int 
    user_submit_problem_seq : int 
    user_submit_solution_time : date 
    user_submit_solution_result : str 
    user_submit_solution_result_category : str 
    user_submit_solution_language : str 
    user_submit_solution_code : str 
    user_submit_solution_runtime : str 
    user_submit_solution_memory : str 
    problem_id : str 

class GPTSolutionData(BaseModel):
    gpt_solution_seq : int
    user_submit_solution_seq : int
    gpt_solution_time_complexity : str
    gpt_solution_time_complexity_reason : str
    gpt_solution_time_complexity_score : int
    gpt_solution_space_complexity : str
    gpt_solution_space_complexity_reason : str
    gpt_solution_space_complexity_score : int
    gpt_solution_refactoring_suggestion : str
    gpt_solution_clean_score : int
    gpt_solution_total_score : int 