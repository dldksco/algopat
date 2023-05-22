import functools
import time
import os
from logging import getLogger, FileHandler, Formatter, DEBUG, INFO
import asyncio
import datetime

# logger 설정
logger = getLogger()
logger.setLevel(DEBUG)

def update_file_handler():
    global file_handler
    log_directory = "/logs"
    os.makedirs(log_directory, exist_ok=True)
    container_name = os.environ.get('CONTAINER_NAME', 'default_container_name')

    # 로그 파일 이름에 오늘의 날짜를 추가
    today = datetime.date.today().strftime("%Y%m%d")
    log_file_path = os.path.join(log_directory, f"{container_name}-{today}.log")

    # 파일 핸들러 업데이트
    if file_handler is not None:
        logger.removeHandler(file_handler)

    file_handler = FileHandler(log_file_path)
    file_handler.setLevel(INFO)
    formatter = Formatter(f'[{container_name}] %(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

file_handler = None
update_file_handler()

async def schedule_daily_update():
    while True:
        now = datetime.datetime.now()
        tomorrow = now.date() + datetime.timedelta(days=1)
        midnight = datetime.datetime.combine(tomorrow, datetime.time(0, 0))
        seconds_until_midnight = (midnight - now).seconds
        await asyncio.sleep(seconds_until_midnight)
        update_file_handler()

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
            logger.info('----------------------------------------------------------------------------------------------------')
            return result
        return wrapper
    return decorator