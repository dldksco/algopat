from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from processing.processing import processing
from myclass.problem import ProblemData
import json
import logging 
import asyncio
from my_dto.common_dto import MessageDTO


# 카프카 서버 정보!!!
# kafka_servers = ["localhost:9092", "localhost:9093", "localhost:9094"] 
KAFKA_BOOTSTRAP_SERVERS = "host.docker.internal:9092,host.docker.internal:9093,host.docker.internal:9094"
KAFKA_GROUP_ID = "group-algopat"
# kafka_servers = ["host.docker.internal:9092", "host.docker.internal:9093", "host.docker.internal:9094"]
# kafka_servers = ["kafka1:9092", "kafka2:9093", "kafka3:9094"]

# logger 설정 
logger = logging.getLogger()

# Consumer 
# 카프카를 통해 consume한 문제 정보를 통해 GPT 응답 생성 
async def consume_problem_summary(topic : str):
    logger.info("listen to 토픽 : " + topic)

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
            logger.info("데이터가 넘어옴")
            await asyncio.sleep(1)            
            data = ProblemData(**msg.value) # Dict to Class Type (카프카를 통해 consume한 데이터를 Python 클래스 형태로 변환)
            asyncio.create_task(processing(data, send)) # 비즈니스 로직 수행 
    finally:
        await consumer.stop() # anomaly 상태일 때 종료 



# Producer
# 카프카로 메시지 전송 함수 
# async def send(topic : str, message):
#     producer = AIOKafkaProducer(
#         bootstrap_servers = KAFKA_BOOTSTRAP_SERVERS,
#         # value_serializer = lambda m : m.encode("utf-8") 
#         value_serializer = lambda m : json.dumps(m).encode("utf-8") 
#     )
#     await producer.start()
#     logger.info("Send to 토픽 : " + topic)
#     await producer.send_and_wait(topic, message)
#     await producer.stop()

# @@@@@@@@@@@@@@@@@@ 이부분 수정 @@@@@@@@@@@@@@@@@@@@
async def send(topic : str, message_dto : MessageDTO):
    producer = AIOKafkaProducer(
        bootstrap_servers = KAFKA_BOOTSTRAP_SERVERS,
        # value_serializer = lambda m : m.encode("utf-8") 

        # @@@@@@@@@@@@@@@@@@ 이부분 수정 @@@@@@@@@@@@@@@@@@@@
        value_serializer = lambda m : json.dumps(m).encode("utf-8") 
    )
    await producer.start()
    logger.info("Send to 토픽 : " + topic)

    # @@@@@@@@@@@@@@@@@@ 이부분 수정 @@@@@@@@@@@@@@@@@@@@
    serialized_message = message_dto.dict()
    await producer.send_and_wait(topic, serialized_message)
    await producer.stop()


