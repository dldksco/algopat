from langchain.prompts import PromptTemplate

SUMMARY_PROMPT_INFO_TMPL = (
    "CONSTRAINTS:\n"
    "Your job is to convert the given problem information into the given form\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info_origin}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "A summary of the inputs and outputs should include information about the names of the variables, their definitions, and their scope\n"
    "If the information given is not in English, it must be translated into English\n"
    "You should respond only as described below\n"
    "Please write all data in sentence form, not list form.\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_problem_summary_input: <Summarized input information>\n"
    "gpt_problem_summary_output: <Summarized output information>\n"
    "gpt_problem_summary_constraints: <Summarized constraints of problem>"
    "problem_algorithm_type: <algorithm type>\n"
    "problem_time_limit: <time limit>\n"
    "problem_space_limit: <space limit>\n"
    "--------\n"
)

SUMMARY_PROMPT_INFO = PromptTemplate(
    input_variables=["problem_info_origin"],
    template=SUMMARY_PROMPT_INFO_TMPL,
)