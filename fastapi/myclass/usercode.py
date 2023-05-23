from pydantic import BaseModel, Field
from typing import Optional


class UsercodeSummary(BaseModel):
    gpt_solution_time_complexity_reason: Optional[str] = None
    gpt_solution_time_complexity_good_point: Optional[str] = None
    gpt_solution_time_complexity_bad_point: Optional[str] = None
    gpt_improving_time_complexity_suggestion: Optional[str] = None
    gpt_solution_time_complexity: Optional[str] = None
    gpt_solution_time_score: Optional[int] = None
    gpt_solution_space_complexity_reason: Optional[str] = None
    gpt_solution_space_complexity_good_point: Optional[str] = None
    gpt_solution_space_complexity_bad_point: Optional[str] = None
    gpt_improving_space_complexity_suggestion: Optional[str] = None
    gpt_solution_space_complexity: Optional[str] = None
    gpt_solution_space_score: Optional[int] = None
    gpt_solution_refactoring_suggestion: Optional[str] = None
    gpt_solution_clean_score: Optional[int] = None
    total_score: Optional[int] = None