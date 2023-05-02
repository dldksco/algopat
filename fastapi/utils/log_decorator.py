import functools
from logging import getLogger
import time

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