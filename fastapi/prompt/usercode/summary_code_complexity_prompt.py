from langchain.prompts import PromptTemplate

SUMMARY_CODE_COMPLEXITY_TMPL = (
    "CONSTRAINTS:\n"
    "Your job is to estimate the time complexity and space complexity of the user's algorithmic problem code.\n"
    "We provide you with the problem information and the user's code.\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "USER CODE:\n"
    "--------\n"
    "{user_code}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "don't miss any rationale for time complexity and space complexity in user's code.\n"
    "if the code is recursive, make sure that the ground truth is set properly and include it in the rationale for calculating the time complexity.\n"
    "When calculating the time complexity, the constant term should also be checked in detail.\n"
    "Once you have calculated the time complexity and space complexity of user's code\n"
    "Score compared to the temporal complexity and spatial complexity of the problem information. Score range: (0 <= score <= 100)\n"
    "Compares the user's runtime and the memory used by the user to the time and space constraints of the problem to get a score.\n"
    "Time score = 100 * (time limit - runtime / time limit)\n"
    "Space score = 100 * (space limit - memory / time limit)\n"
    "The higher of these two scores is the score.\n"
    "If you don't think user's code exceed the time limit, given the time complexity of the code and the size of the input for the given problem, you should be generous with your score."
    "The reason for each complexity should be as detailed as possible."
    "Please write all data in sentence form, not list form.\n"
    "You should respond only as described below\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_solution_time_complexity: <Time complexity estimated from user's code Big O Notation (with constant terms)>\n"
    "gpt_solution_time_complexity_reason: <reason of time complexity of user's code>"
    "gpt_solution_time_score: <Max(time complexity score, 100 * (1 - runtime / time limit)) (only number)>"
    "gpt_solution_spcae_complexity: <Space complexity estimated from user's code Big O Notation (with constant terms)>\n"
    "gpt_solution_spcae_complexity_reason: <reason of space complexity of user's code>"
    "gpt_solution_spcae_score: <Max(space complexity score, 100 * (1 - memory / time limit)) (only number)>"
    "--------\n"
)

SUMMARY_CODE_COMPLEXITY = PromptTemplate(
    input_variables=["problem_info", "user_code"],
    template=SUMMARY_CODE_COMPLEXITY_TMPL,
)