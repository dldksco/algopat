from fastapi import FastAPI
from asyncio import create_task
from my_kafka.handler import consume_problem_summary
import logging
from config.logger_config import setup_logging # logger_config 모듈 임포트 
from database.get_session import create_tables

# logger 기본 설정 호출 
setup_logging()

# logger 설정 
logger = logging.getLogger()

app = FastAPI()

# health 체크 
@app.get("/health")
async def health_check():
    return {"status" : "OK!!!"}

# 카프카 리스너 실행 
@app.on_event("startup")
async def startup_event():
    logger.info("서버 시작")
    await create_tables()
    create_task(consume_problem_summary("usercode")) # Topic : usercode