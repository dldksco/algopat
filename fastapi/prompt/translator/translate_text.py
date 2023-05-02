from langchain.prompts import PromptTemplate

TRANSLATOR_PROMPT_TMPL = (
    "CONSTRAINTS: Your task is to translate a given sentence into Korean.\n"
    "Translate the text into Korean, excluding function names, variable names, and anything related to the code.\n"
    "You should try to make your translation as awkward as possible.\n"
    "Your reader is a programmer, so translate into a language they can understand.\n"
    "If there is no text, it responds with '좋습니다!'."
    "TEXT:\n"
    "--------\n"
    "{text}\n"
    "--------\n"
)

TRAMSLATOR_PROMPT = PromptTemplate(
    input_variables=["text"],
    template=TRANSLATOR_PROMPT_TMPL,
)