import tiktoken
import re

encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")

async def count_token(data : str):
    num_tokens = len(encoding.encode(data))
    return num_tokens

async def remove_comments(code : str, lang_type : str):
    code = code.replace('\r\n', '\n')
    if lang_type == 'c' or lang_type == 'c++':
        code = re.sub(re.compile('/\*.*?\*/', re.DOTALL), '', code)  # Remove multi-line comments
        code = re.sub(re.compile('//.*?\n'), '\n', code)  # Remove single-line comments
    elif lang_type == 'java' or lang_type == 'javascript':
        code = re.sub(re.compile('/\*.*?\*/', re.DOTALL), '', code)  # Remove multi-line comments
        code = re.sub(re.compile('//.*?\n'), '\n', code)  # Remove single-line comments
    elif lang_type == 'python':
        code = re.sub(re.compile('""".*?"""', re.DOTALL), '', code)  # Remove multi-line comments
        code = re.sub(re.compile('#.*?\n'), '\n', code)  # Remove single-line comments
    return code

# 코드 빈 라인 제거 함수
async def remove_empty_lines(code : str):
    lines = code.splitlines()
    non_empty_lines = []
    for line in lines:
        stripped_line = line.strip()
        if stripped_line:
            non_empty_lines.append(line)
    return '\n'.join(non_empty_lines)

async def preprocessing_code(code : str, lang_type : str):
    lang_type = await parse_lang_type(lang_type)
    preprocessed_code = await remove_comments(code, lang_type)
    preprocessed_code = await remove_empty_lines(preprocessed_code)
    return preprocessed_code

async def parse_lang_type(lang_type : str):
    
    lower_case_lang_type = lang_type.lower()
    if 'c++' in lower_case_lang_type:
        return 'c++'
    elif 'c' in lower_case_lang_type:
        return 'c'
    elif 'javascript' in lower_case_lang_type:
        return 'javascript'
    elif 'java' in lower_case_lang_type:
        return 'java'
    elif 'py' in lower_case_lang_type:
        return 'python'
    else:
        return 'unknown'
    