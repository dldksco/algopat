from fastapi import FastAPI
from asyncio import create_task
from myclass.problem import ProblemData
from processing.processing import processing
from my_kafka.handler import consume_problem_summary
from my_kafka.handler import send_alert

app = FastAPI()

@app.get("/health")
async def health_check():
    return {"status" : "OK"}

@app.post("/process")
async def process_data(data: ProblemData):
    output = await processing(data)
    return output

@app.on_event("startup")
async def startup_event():
    print("카프카 start up!!!")
    create_task(consume_problem_summary("usercode"))


