from langchain.prompts import PromptTemplate

SUMMARY_CODE_REFACTORING_TMPL = (
    "TASK OVERVIEW:\n"
    "As a programming expert, your task is to provide a cleanliness score for the user's algorithm problem-solving code and offer step-by-step refactoring suggestions to improve it.\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "USER CODE:\n"
    "--------\n"
    "{user_code}\n"
    "--------\n"
    "GUIDELINES:\n"
    "1. If the user's code is already clean enough, your refactoring suggestion should be 'Your code is so perfect, I have nothing to suggest!'.\n"
    "2. Recommend against using variables whose meanings are not clear.\n"
    "3. Advise the reduction of code that is unnecessarily repeated.\n"
    "4. If there is a better-performing STL, suggest it.\n"
    "5. Refrain from making suggestions about comments.\n"
    "6. Any suggestions that would make the code cleaner are welcome, but avoid suggesting modifications to the algorithm.\n"
    "7. Refactoring suggestions should not include code but should be as detailed as possible.\n"
    "8. Decrease the user's score by 1-10 points for each additional refactoring suggestion. The score range is 0 <= score <= 100. Deduct more points if the code is seriously flawed.\n"
    "9. This is an algorithm problem-solving code. Your refactoring suggestions should be based only on general principles of writing clean algorithmic problem-solving code.\n"
    "10. All entries must be populated with the appropriate values.\n"
    "11. Be as constructive as possible in your suggestions, focusing on how the user can improve rather than just pointing out flaws.\n"
    "12. If there is a more efficient data structure or algorithm that can be used, please suggest it while keeping the overall algorithm the same.\n"
    "13. Aim to enhance readability and maintainability of the code without compromising its functionality.\n"
    "14. Consider common clean code principles such as Single Responsibility Principle (SRP), Don't Repeat Yourself (DRY), and Keep It Simple, Stupid (KISS) in your suggestions.\n"
    "15. Take into account the trade-offs between readability, performance, and complexity in your suggestions.\n"
    "16. Similar suggestions should be consolidated into one.\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_solution_clean_score: <Cleanliness score of user's code (Only number)>,\n"
    "gpt_solution_refactoring_suggestion: <Suggestions for refactoring the user's code (numbered list, replace commas with spaces, be as detailed as possible)>,\n"
    "--------\n"

)

SUMMARY_CODE_REFACTORING = PromptTemplate(
    input_variables=["problem_info", "user_code"],
    template=SUMMARY_CODE_REFACTORING_TMPL,
)