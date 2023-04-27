from fastapi import FastAPI
from asyncio import create_task
from myclass.problem import ProblemData
from processing.processing import processing
from my_kafka.handler import consume_problem_summary
import logging
from config.logger_config import setup_logging # logger_config 모듈 임포트 

# logger 기본 설정 호출 
setup_logging()

# logger 설정 
logger = logging.getLogger()

app = FastAPI()

# health 체크 
@app.get("/health")
async def health_check():
    return {"status" : "OK"}

# GPT 응답 생성 로직 
@app.post("/process")
async def process_data(data: ProblemData):
    output = await processing(data)
    return output

# 카프카 리스너 실행 
@app.on_event("startup")
async def startup_event():
    logger.info("usercode 리스너 시작!!!")
    create_task(consume_problem_summary("usercode")) # Topic : usercode


