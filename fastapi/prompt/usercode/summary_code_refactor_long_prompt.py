from langchain.prompts import PromptTemplate

SUMMARY_CODE_REFACTORING_LONG_TMPL = (
    "CONSTRAINTS:\n"
    "You're a programming expert.\n"
    "Your task is to provide a clean code score for the user's code, along with refactoring suggestions step by step.\n"
    "I have provide an existing result up to a certain point\n"
    "EXISTING RESULT: \n"
    "--------\n"
    "{existing_result}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "The problem information and the user's code are as follows:\n"
    "CONSTRAINTS:\n"
    "We provide you with the problem information and the user's code.\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "provide two codes below, divided into 1000 tokens\n"
    "USER CODE:\n"
    "----(first code)----\n"
    "{first_code}\n"
    "----(first code end)----\n"
    "----(second code)----\n"
    "{second_code}\n"
    "----(second code end)----\n"
    "CONSTRAINTS:\n"
    "If user code is already clean enough, the refactoring suggestion is 'Your code is so perfect, I have nothing to suggest!'\n"
    "The suggestion is to avoid using variables whose meaning is not clear.\n"
    "Suggest reducing code that is repeated without meaning.\n"
    "If there is a better performing STL suggest it.\n"
    "Does not make suggestions for comments.\n"
    "Any suggestions to make the code cleaner are welcome.\n"
    "But don't suggest modifications to the algorithm.\n"
    "Refactoring suggestions do not include code, but please be detailed.\n"
    "For each additional refactoring suggestion, decrease the user's score by 1~10 points. Score range: (0 <= score <= 100)\n"
    "Decrease scores more if the code is seriously bad.\n"
    "Please combine similar refactoring suggestions into one.\n"
    "All entries must be populated with the appropriate values.\n"
    "Remember, this is algorithmic problem solving code.\n"
    "Your refactoring suggestions should be based only on how to write clean algorithmic problem solving code in general.\n"
    "You should respond only as described below\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_solution_clean_score: <Cleanliness score of user's code (Only number)>,\n"
    "gpt_solution_refactoring_suggestion: <Suggestions for refactoring the user's code (numbered list, replace commas with spaces, as detail as possible)>,\n"
    "--------\n"
)

SUMMARY_CODE_REFACTORING_LONG = PromptTemplate(
    input_variables=["existing_result", "problem_info", "first_code", "second_code"],
    template=SUMMARY_CODE_REFACTORING_LONG_TMPL,
)