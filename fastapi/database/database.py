from myclass.problem import ProblemData
import database.problem as db_problem
from database.problem import UserSubmitProblem, UserSubmitSolution, GPTSolution
from database.get_session import get_session
from logging import getLogger
# logger 설정 
logger = getLogger()

async def save_problem_origin(problem_id : str, data : ProblemData):
    logger.info("문제 존재 여부 확인")
    async with get_session() as session:
        if await db_problem.check_problem_is_exist(problem_id, session) == False:
            logger.info("문제 DB 저장")
            await db_problem.insert_problem(data, await session)

async def save_problem_summary(problem_id : str, summary_json):
    logger.info("GPT 문제 요약 존재 여부 확인")
    async with get_session() as session:
        if await db_problem.check_gpt_problem_summary_is_exist(problem_id, session) == False:
            logger.info("GPT 문제 요약 DB 저장")
            await db_problem.insert_gpt_problem_summary(summary_json, session)

async def save_user_problem_origin(problem_id : str):
    logger.info("회원 푼 문제 불러오기")
    async with get_session() as session:
        userSubmitProblemData = await db_problem.get_user_submit_problem(problem_id, session)   
        if userSubmitProblemData is None:    
            userSubmitProblemData = UserSubmitProblem(
                problem_id = problem_id,
                user_seq = 9999 # Todo : user_seq를 넘겨 받을 예정 
            )
            logger.info("회원 푼 문제 DB 저장")
            userSubmitProblemData = await db_problem.insert_user_submit_problem(userSubmitProblemData, session)
        return userSubmitProblemData.user_submit_problem_seq

async def check_gpt_problem_summary_is_exist(problem_id : str):
    async with get_session() as session:
        return await db_problem.check_gpt_problem_summary_is_exist(problem_id, session)

async def get_gpt_problem_summary(problem_id : str):
    async with get_session() as session:
        return await db_problem.get_gpt_problem_summary(problem_id, session)

async def save_user_submit_solution_origin(user_submit_problem_seq : int, problem_id : str, data : ProblemData):
    logger.info("회원 제출 코드 DB 접근")
    async with get_session() as session:
        ### 회원 제출 코드 DB 접근 ### 
        UserSubmitSolutionData = UserSubmitSolution(
            user_submit_problem_seq = user_submit_problem_seq,
            # user_submit_solution_time = data.submissionTime,
            user_submit_solution_result = data.result,
            user_submit_solution_result_category = data.resultCategory,
            user_submit_solution_language = data.language,
            user_submit_solution_code = data.code,
            user_submit_solution_runtime = data.runtime,
            user_submit_solution_memory = data.memory,
            problem_id = problem_id
        )
        logger.info("회원 제출 코드 DB 저장")
        user_submit_solution_seq = await db_problem.insert_user_submit_solution(UserSubmitSolutionData, session)
        return user_submit_solution_seq


async def save_gpt_solution(user_submit_solution_seq, result):
    logger.info("GPT평가 DB 접근")
    async with get_session() as session:
        GPTSolutionData = GPTSolution(
            user_submit_solution_seq = user_submit_solution_seq,
            gpt_solution_time_complexity = result.gpt_solution_time_complexity,
            gpt_solution_time_complexity_reason = result.gpt_solution_time_complexity_reason,
            gpt_solution_time_score = result.gpt_solution_time_score,
            gpt_solution_time_complexity_good_point = result.gpt_solution_time_complexity_good_point,
            gpt_solution_time_complexity_bad_point = result.gpt_solution_time_complexity_bad_point,
            gpt_improving_time_complexity_suggestion = result.gpt_improving_time_complexity_suggestion,
            gpt_solution_space_complexity = result.gpt_solution_space_complexity,
            gpt_solution_space_complexity_reason = result.gpt_solution_space_complexity_reason,
            gpt_solution_space_score = result.gpt_solution_space_score,
            gpt_solution_space_complexity_good_point = result.gpt_solution_space_complexity_good_point,
            gpt_solution_space_complexity_bad_point = result.gpt_solution_space_complexity_bad_point,
            gpt_improving_space_complexity_suggestion = result.gpt_improving_space_complexity_suggestion,
            gpt_solution_clean_score = result.gpt_solution_clean_score,
            gpt_solution_refactoring_suggestion = result.gpt_solution_refactoring_suggestion,
            total_score = result.total_score
        )
        logger.info("GPT평가 DB 저장")
        await db_problem.insert_gpt_solution(GPTSolutionData, session)