from fastapi import FastAPI
from myclass.problem import ProblemData
from processing.processing import processing

app = FastAPI()

@app.get("/health")
async def health_check():
    return {"status" : "OK"}

@app.post("/process")
async def process_data(data: ProblemData):
    output = await processing(data)
    return output