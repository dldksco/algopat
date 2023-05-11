from langchain.prompts import PromptTemplate

SUMMARY_CODE_REFACTORING_TMPL = (
    "CONSTRAINTS:\n"
    "You're a programming expert.\n"
    "Your task is to provide a clean code score for the user's code, along with refactoring suggestions step by step.\n"
    "The problem information and the user's code are as follows:\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "USER_CODE:\n"
    "--------\n"
    "{user_code}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "If user's code is already clean enough, the refactoring suggestion is 'flawless!\n"
    "The suggestion is to avoid using variables whose meaning is not clear.\n"
    "Suggest reducing code that is repeated without meaning.\n"
    "If there is a better performing STL or input/output function, suggest it.\n"
    "Does not make suggestions for comments.\n"
    "Any suggestions to make the code cleaner are welcome.\n"
    "But don't suggest modifications to the algorithm.\n"
    "Refactoring suggestions do not include code, but please be detailed.\n"
    "For each additional refactoring suggestion, decrease the user's score by 1-10 points. Score range: (0 <= score <= 100)\n"
    "Decrease scores more if the code is seriously bad.\n"
    "All entries must be populated with the appropriate values.\n"
    "You should respond only as described below\n"
    "RESPONSE_FORMAT:\n"
    "--------\n"
    "gpt_solution_clean_score: <Cleanliness score of user's code (Only number)>,\n"
    "gpt_solution_refactoring_suggestion: <Suggestions for refactoring the user's code (numbered list, replace commas with spaces, as detail as possible)>,\n"
    "--------\n"
)

SUMMARY_CODE_REFACTORING = PromptTemplate(
    input_variables=["problem_info", "user_code"],
    template=SUMMARY_CODE_REFACTORING_TMPL,
)