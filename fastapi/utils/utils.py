import tiktoken
import re
from datetime import datetime

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
        return 'C++'
    elif 'javascript' in lower_case_lang_type or 'js' in lower_case_lang_type:
        return 'JavaScript'
    elif 'java' in lower_case_lang_type:
        return 'Java'
    elif 'py' in lower_case_lang_type:
        return 'Python'
    elif 'c11' in lower_case_lang_type or 'c99' in lower_case_lang_type or 'c90' in lower_case_lang_type:
        return 'C'
    else:
        return 'unknown'
    

async def parse_date_format(origin_date : str):
    origin_date_format = "%Y년 %m월 %d일 %H:%M:%S"
    date_format = "%Y-%m-%d %H:%M:%S"
    
    origin_datetime_obj = datetime.strptime(origin_date, origin_date_format)
    timestamp_str = origin_datetime_obj.strftime(date_format)
    return timestamp_str
    
# 시간 복잡도 (str -> int)
def parse_problem_time_limit(time_limit: str) -> int:
    time_limit = time_limit.split(" ")[0]
    return int(float(time_limit) * 1000)  # 초 단위를 밀리초 단위로 변환

# 공간 복잡도 (str -> int)
def parse_problem_space_limit(space_limit: str) -> int:
    if "GB" in space_limit:
        return int(float(space_limit.replace("GB", "")) * 1024 * 1024)
    elif "MB" in space_limit:
        return int(float(space_limit.replace("MB", "")) * 1024)
    elif "KB" in space_limit:
        return int(float(space_limit.replace("KB", "")))
    else:
        return int(space_limit)