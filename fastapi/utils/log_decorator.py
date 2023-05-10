import functools
import time
import os
from logging import getLogger, FileHandler, Formatter, DEBUG, INFO

# logger 설정 
logger = getLogger()
logger.setLevel(DEBUG)

# 로그 파일 저장 경로 설정
log_directory = "/home/ubuntu/logs"
os.makedirs(log_directory, exist_ok=True)

# 로그 파일 이름을 컨테이너별로 다르게 설정해야 합니다.
# 아래와 같이 컨테이너 이름을 가져올 수 있습니다.
container_name = os.environ.get('CONTAINER_NAME', 'default_container_name')
log_file_path = os.path.join(log_directory, f"{container_name}.log")

# 로그 파일 핸들러 추가
file_handler = FileHandler(log_file_path)
file_handler.setLevel(INFO)

# 로그 메시지 포맷 설정
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

# 파일 핸들러를 로거에 추가
logger.addHandler(file_handler)

# logger 설정 
logger = getLogger()


def log_decorator(custom_text):
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            logger.info(f"{custom_text} 시작")
            result = await func(*args, **kwargs)
            logger.info(f"{custom_text} 완료")
            return result
        return wrapper
    return decorator

def time_logger(custom_text):
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            logger.info(f"{custom_text} 시작")
            start_time = time.perf_counter()
            result = await func(*args, **kwargs)
            end_time = time.perf_counter()
            elapsed_time = end_time - start_time
            logger.info(f"{custom_text} 종료  (elapsed time: {elapsed_time:.6f} seconds)")
            return result
        return wrapper
    return decorator