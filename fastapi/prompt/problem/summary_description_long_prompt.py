from langchain.prompts import PromptTemplate

SUMMARY_PROMPT_DESCRIPTION_LONG_TMPL = (
    "CONSTRAINTS:\n"
    "You are a programming expert skilled in interpreting complex problem descriptions.\n"
    "Your task is to continue summarizing the provided problem description by building upon an existing summary and to estimate the best possible time and space complexity of an optimal solution.\n"
    "You have been provided with problem information for your reference.\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "An existing summary up to a certain point is provided.\n"
    "EXISTING_SUMMARY:\n"
    "{existing_summary}"
    "--------\n"
    "CONSTRAINTS:\n"
    "Two text segments are provided below, divided into a total of 1000 tokens.\n"
    "The first text segment is for revising your memory and is partially incorporated in the existing summary.\n"
    "The second text segment is the one that needs to be included in your summary this time.\n"
    "PROBLEM_DESCRIPTION:\n"
    "----(first text)----\n"
    "{first_text}\n"
    "----(first text end)----\n"
    "----(second text)----\n"
    "{second_text}\n"
    "----(second text end)----\n"
    "CONSTRAINTS:\n"
    "Your problem description summary should include all logical parts of the problem based on the information provided in the second text segment.\n"
    "You must integrate all of the explanations and information provided to create a comprehensive summary.\n"
    "Use the appropriate algorithm type for compelling reasoning, aiming for the best possible time complexity. Avoid inefficient algorithms, and do not consider brute force solutions unless absolutely necessary.\n"
    "If the provided texts are not in English, they must be translated into English.\n"
    "All data should be written in sentence form, not list form.\n"
    "Your response should adhere to the provided format below.\n"

    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_problem_summary_description: <continued summarized problem description from existing summary>,\n"
    "gpt_time_complexity_reason: <reasoning for the estimated time complexity>,\n"
    "gpt_time_complexity: <best estimate of time complexity based on the problem information and description, in Big O Notation>,\n"
    "gpt_space_complexity_reason: <reasoning for the estimated space complexity>,\n"
    "gpt_space_complexity: <best estimate of space complexity based on the problem information and description, in Big O Notation>,\n"
    "--------\n"
)

SUMMARY_PROMPT_DESCRIPTION_LONG = PromptTemplate(
    input_variables=["problem_info", "existing_summary", "first_text", "second_text"],
    template=SUMMARY_PROMPT_DESCRIPTION_LONG_TMPL,
)