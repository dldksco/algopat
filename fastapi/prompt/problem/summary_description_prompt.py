from langchain.prompts import PromptTemplate

SUMMARY_PROMPT_DESCRIPTION_TMPL = (
    "CONSTRAINTS:\n"
    "You are a programming expert equipped with knowledge about various algorithmic patterns.\n"
    "You are tasked to understand, summarize, and analyze the provided problem.\n"
    "Your role involves determining the expected time complexity and space complexity of the optimal solution, based on the problem's nature and the algorithmic pattern suggested by the tags.\n"
    "You have the problem information for your reference below:\n"
    "PROBLEM INFORMATION:\n"
    "--------\n"
    "{problem_info}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "Your job is to transform the original problem description into a summarized version. Ensure the summary includes all logical components and is clearly understandable.\n"
    "--------\n"
    "{problem_description_origin}\n"
    "--------\n"
    "CONSTRAINTS:\n"
    "The problem summary should incorporate all details from the original problem description.\n"
    "Algorithmic pattern provided in the tags should guide your reasoning towards the optimal solution. Aim for the best possible time complexity, avoiding inefficient algorithms where possible. Do not consider brute force solutions unless absolutely necessary.\n"
    "If the problem description is not in English, you must translate it into English.\n"
    "Your final response should be composed in complete sentences, avoiding list format.\n"
    "Please follow the response format provided below:\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "gpt_problem_summary_description: <summarized problem description>,\n"
    "gpt_time_complexity_reason: <reasoning based on problem description and algorithmic pattern>,\n"
    "gpt_time_complexity: <expected time complexity based on your analysis. Provide only in Big O notation>,\n"
    "gpt_space_complexity_reason: <reasoning based on problem description and algorithmic pattern>,\n"
    "gpt_space_complexity: <expected space complexity based on your analysis. Provide only in Big O notation>,\n"
    "--------\n"
)

SUMMARY_PROMPT_DESCRIPTION = PromptTemplate(
    input_variables=["problem_info", "problem_description_origin"],
    template=SUMMARY_PROMPT_DESCRIPTION_TMPL,
)