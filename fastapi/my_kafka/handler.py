from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from processing.processing import processing
from myclass.problem import ProblemData
import json
import logging 
import asyncio
from pydantic import BaseModel


# 카프카 서버 정보!!!
# kafka_servers = ["localhost:9092", "localhost:9093", "localhost:9094"] 
KAFKA_BOOTSTRAP_SERVERS = "host.docker.internal:9092,host.docker.internal:9093,host.docker.internal:9094"
KAFKA_GROUP_ID = "group-algopat"

# logger 설정 
logger = logging.getLogger()

# Consumer 
# 카프카를 통해 consume한 문제 정보를 통해 GPT 응답 생성 
async def consume_problem_summary(topic : str):
    consumer = AIOKafkaConsumer(
        topic,
        bootstrap_servers = KAFKA_BOOTSTRAP_SERVERS,
        group_id=KAFKA_GROUP_ID,
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
        session_timeout_ms=100000,  # Increase this value if needed
        request_timeout_ms=200000,
        # heartbeat_interval_ms=10000,  # Increase this value if needed
        # max_poll_interval_ms=500000
    )

    await consumer.start()
    try:
        async for msg in consumer:
            logger.info("데이터 수신")
            await asyncio.sleep(1)            
            data = ProblemData(**msg.value)                 # Dict to Class Type (카프카를 통해 consume한 데이터를 Python 클래스 형태로 변환)
            asyncio.create_task(processing(data, send))     # 비즈니스 로직 수행 
    finally:
        logger.info("카프카 컨슈머 에러 - 컨슈머 종료")
        await consumer.stop()                               # anomaly 상태일 때 종료 



# Producer
# 카프카로 메시지 전송 함수 
async def send(topic : str, message_dto : BaseModel):
    producer = AIOKafkaProducer(
        bootstrap_servers = KAFKA_BOOTSTRAP_SERVERS,                                         # 카프카 서버 설정 
        value_serializer = lambda m : json.dumps(m, ensure_ascii=False).encode("utf-8"),     # 유니코드 사용 X, JSON 타입으로 직렬화 
        retry_backoff_ms=10,                                                                 # 재시도 interval time 
        enable_idempotence=True,                                                             # 중복 방지 모드 활성화
        request_timeout_ms=500,                                                              # 요청 만료 시간 설정 (예: 500ms)
    )
    await producer.start()
    logger.info("Send to 토픽 : " + topic)

    serialized_message = message_dto.dict()
    await producer.send_and_wait(topic, serialized_message)
    await producer.stop()

