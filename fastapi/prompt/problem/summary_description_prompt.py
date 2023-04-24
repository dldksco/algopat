from langchain.prompts import PromptTemplate

SUMMARY_PROMPT_DESCRIPTION_TMPL = (
    "CONSTRAINTS:\n"
    "Your job is to summarize the problem description\n"
    "And to estimate the expected time complexity and space complexity of the solution\n"
    "Below is the problem information for your reference\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "Below is a problem description that you should summarize\n"
    "--------\n"
    "{problem_description_origin}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "The problem description summary must include all logical parts of the problem\n"
    "You must synthesize all of the explanations and information provided to arrive at your conclusion\n"
    "Algorithm type should be used as a tool for powerful reasoning\n"
    "Remember to get the best possible time complexity. Avoid inefficient algorithms (if possible)\n"
    "Don't consider Bruteforce(if possible)\n"
    "If the description given is not in English, it must be translated into English\n"
    "Please write all data in sentence form, not list form.\n"
    "You should respond only as described below\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_problem_summary_description: <summarized problem description>\n"
    "gpt_time_complexity: <best guess of time complexity given information, problem description. only Big O Notation>\n"
    "gpt_time_complexity_reason: <reason of time complexity>"
    "gpt_space_complexity: <best guess of spatial complexity given information, problem description. only Big O Notation>\n"
    "gpt_space_complexity_reason: <reason of spatial complexity>"
    "--------\n"
)

SUMMARY_PROMPT_DESCRIPTION = PromptTemplate(
    input_variables=["problem_info", "problem_description_origin"],
    template=SUMMARY_PROMPT_DESCRIPTION_TMPL,
)