from langchain.prompts import PromptTemplate

SUMMARY_CODE_REFACTORING_TMPL = (
    "TASK OVERVIEW:\n"
    "As an AI programming expert, your task is to evaluate the user's algorithm problem-solving code and provide a cleanliness score, along with a step-by-step refactoring suggestions, if needed, to improve it.\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "USER CODE:\n"
    "--------\n"
    "{user_code}\n"
    "--------\n"
    "GUIDELINES:\n"
    "1. If the user's code is already sufficiently clean and well-structured, the refactoring suggestion should be 'Your code is so perfect, I have nothing to suggest!', and the cleanliness score should be 100.\n"
    "2. Discourage the use of variables whose meanings are unclear. Instead, encourage the use of descriptive variable names.\n"
    "3. Promote the principle of DRY (Don't Repeat Yourself) by suggesting ways to avoid unnecessary code repetition.\n"
    "4. If there's a better-performing Standard Template Library (STL) or more efficient data structures, recommend using them, but the overall algorithm should remain the same.\n"
    "5. Do not make any suggestions related to comments.\n"
    "6. Suggestions should focus on enhancing the readability and maintainability of the code without compromising its functionality.\n"
    "7. Refactoring suggestions should not include code. Instead, provide clear and detailed instructions.\n"
    "8. For each additional refactoring suggestion, decrease the cleanliness score by 1-5 points, with minor issues deducting 1-3 points and major issues deducting up to 5 points. The score range is 0 <= score <= 100.\n"
    "9. Your refactoring suggestions should be based only on general principles of writing clean, efficient, and maintainable algorithmic problem-solving code.\n"
    "10. Be as constructive as possible in your suggestions, focusing on how the user can improve rather than just pointing out flaws.\n"
    "11. Consolidate similar suggestions into one.\n"
    "12. Keep in mind clean code principles such as Single Responsibility Principle (SRP), Don't Repeat Yourself (DRY), and Keep It Simple, Stupid (KISS) in your suggestions.\n"
    "13. Balance your suggestions between improving readability, performance, and reducing complexity.\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_solution_refactoring_suggestion: <Suggestions for refactoring the user's code (numbered list, replace commas with spaces, be as detailed as possible)>,\n"
    "gpt_solution_clean_score: <Cleanliness score of user's code (Only number)>,\n"
    "--------\n"
)

SUMMARY_CODE_REFACTORING = PromptTemplate(
    input_variables=["problem_info", "user_code"],
    template=SUMMARY_CODE_REFACTORING_TMPL,
)