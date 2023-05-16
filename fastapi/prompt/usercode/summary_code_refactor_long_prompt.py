from langchain.prompts import PromptTemplate

SUMMARY_CODE_REFACTORING_LONG_TMPL = (
    "TASK OVERVIEW:\n"
    "As a programming expert, your task is to assess the cleanliness of the user's algorithm problem-solving code and provide step-by-step refactoring suggestions for cleaner code.\n"
    "EXISTING RESULT:\n"
    "--------\n"
    "{existing_result}\n"
    "--------\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "USER CODE:\n"
    "----(First Code)----\n"
    "{first_code}\n"
    "----(End of First Code)----\n"
    "----(Second Code)----\n"
    "{second_code}\n"
    "----(End of Second Code)----\n"
    "GUIDELINES:\n"
    "1. If the user code is already clean enough, the refactoring suggestion should be 'Your code is so perfect, I have nothing to suggest!'.\n"
    "2. The suggestion should be to avoid using variables whose meaning is not clear.\n"
    "3. Suggest reducing code that is unnecessarily repeated.\n"
    "4. If there is a better-performing STL, suggest it.\n"
    "5. Do not make suggestions for comments.\n"
    "6. Any suggestions to make the code cleaner are welcome but do not suggest modifications to the algorithm.\n"
    "7. Refactoring suggestions should not include code, but be as detailed as possible.\n"
    "8. For each additional refactoring suggestion, decrease the user's score by 1~10 points. Score range: 0 <= score <= 100. Deduct more points for seriously flawed code.\n"
    "9. Combine similar refactoring suggestions into one.\n"
    "10. All entries must be populated with the appropriate values.\n"
    "11. Your refactoring suggestions should be based on best practices for writing clean algorithm problem-solving code.\n"
    "12. Be as constructive as possible in your suggestions, focusing on how the user can improve rather than just pointing out flaws.\n"
    "13. If there is a more efficient data structure or STL that can be used while keeping the overall algorithm the same, please suggest it.\n"
    "14. Aim to enhance readability and maintainability of the code without compromising its functionality.\n"
    "15. Consider common clean code principles such as Single Responsibility Principle (SRP), Don't Repeat Yourself (DRY), and Keep It Simple, Stupid (KISS) when providing your suggestions.\n"
    "16. Take into account the trade-offs between readability, performance, and complexity in your suggestions.\n"
    "17. Similar suggestions should be consolidated into one.\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_solution_clean_score: <Cleanliness score of user's code (Only number)>,\n"
    "gpt_solution_refactoring_suggestion: <Suggestions for refactoring the user's code (numbered list, replace commas with spaces, be as detailed as possible)>,\n"
    "--------\n"
)

SUMMARY_CODE_REFACTORING_LONG = PromptTemplate(
    input_variables=["existing_result", "problem_info", "first_code", "second_code"],
    template=SUMMARY_CODE_REFACTORING_LONG_TMPL,
)