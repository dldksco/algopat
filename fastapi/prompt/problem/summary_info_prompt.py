from langchain.prompts import PromptTemplate

SUMMARY_PROMPT_INFO_TMPL = (
    "CONSTRAINTS:\n"
    "Your job is to convert the given problem information into the given form\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info_origin}\n"
    "--------\n"
    "A summary of the inputs and outputs should include information about the names of the variables, their definitions, and their scope\n"
    "If the information given is not in English, it must be translated into English\n"
    "You should respond only as described below\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "input: <Summarized input information>\n"
    "output: <Summarized output information>\n"
    "algorithm_type: <algorithm type>\n"
    "limit: <time limit and space limit>\n"
    "--------\n"
)

SUMMARY_PROMPT_INFO = PromptTemplate(
    input_variables=["problem_info_origin"],
    template=SUMMARY_PROMPT_INFO_TMPL,
)