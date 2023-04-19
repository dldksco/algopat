from fastapi import FastAPI
from myclass.problem import ProblemData
import uvicorn

app = FastAPI()

@app.get("/health")
async def health_check():
    return {"status" : "OK"}

@app.post("/process")
async def process_data(data: ProblemData):
    print(data)
    return {"status": "OK!"}