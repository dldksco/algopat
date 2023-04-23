import tiktoken

encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")

async def count_token(data : str):
    num_tokens = len(encoding.encode(data))
    return num_tokens