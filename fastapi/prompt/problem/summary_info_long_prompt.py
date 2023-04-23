from langchain.prompts import PromptTemplate

SUMMARY_PROMPT_INFO_LONG_TMPL = (
    "CONSTRAINTS:\n"
    "Your job is to convert the given problem information into the given form\n"
    "A summary of the inputs and outputs should include information about the names of the variables, their definitions, and their scope\n"
    "If the information given is not in English, it must be translated into English\n"
    "I have provide an existing summary up to a certain point\n"
    "EXISTING_SUMMARY:\n"
    "--------\n"
    "{existing_summary}"
    "--------\n"
    "CONSTRAINTS:\n"
    "provide two texts below, divided into 1000 tokens\n"
    "The first text is provided to help your memory and is partially reflected in the summary\n"
    "The second text is the one you will need to reference in your summary this time\n"
    "PROBLEM_INFORMATION:\n"
    "----(first text)----\n"
    "{first_text}\n"
    "----(first text end)----\n"
    "----(second text)----\n"
    "{second_text}\n"
    "----(second text end)----\n"
    "You should respond only as described below\n"
    "RESPONSE FORMAT:\n"
    "--------\n"
    "input: <Summarized input information>\n"
    "output: <Summarized output information>\n"
    "algorithm_type: <algorithm type>\n"
    "limit: <time limit and space limit>\n"
    "--------\n"
    "given the texts and summary, refine the original summary."
)

SUMMARY_PROMPT_INFO_LONG = PromptTemplate(
    input_variables=["existing_summary", "first_text", "second_text"],
    template=SUMMARY_PROMPT_INFO_LONG_TMPL,
)