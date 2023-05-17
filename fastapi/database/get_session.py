import json
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from database.problem import UserSubmitSolution, GPTSolution, Problem, UserSubmitProblem, GPTProblemSummary, ProblemMeta
from contextlib import asynccontextmanager
from utils.shared_env import mariadb_config

config = json.loads(mariadb_config)

DATABASE_URL = f"mariadb+asyncmy://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}?charset=utf8mb4"
engine = create_async_engine(DATABASE_URL, echo=False, pool_recyle=3600)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

# session 정보 가져오기 
@asynccontextmanager
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

        

async def create_tables():
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all, tables=[Problem.__table__], checkfirst=True)
        await conn.run_sync(Base.metadata.create_all, tables=[ProblemMeta.__table__], checkfirst=True)
        await conn.run_sync(Base.metadata.create_all, tables=[UserSubmitProblem.__table__], checkfirst=True)
        await conn.run_sync(Base.metadata.create_all, tables=[GPTProblemSummary.__table__], checkfirst=True)
        await conn.run_sync(Base.metadata.create_all, tables=[UserSubmitSolution.__table__], checkfirst=True)
        await conn.run_sync(Base.metadata.create_all, tables=[GPTSolution.__table__], checkfirst=True)
