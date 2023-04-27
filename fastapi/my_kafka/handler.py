from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from processing.processing import processing
from myclass.problem import ProblemData
import json
import logging 

# 카프카 서버 정보
# kafka_servers = ["localhost:9092", "localhost:9093", "localhost:9094"]  
# kafka_servers = ["host.docker.internal:9092", "host.docker.internal:9093", "host.docker.internal:9094"]
kafka_servers = ["kafka1:9092", "kafka2:9093", "kafka3:9094"]

# logger 설정 
logger = logging.getLogger()

# Consumer 
# 카프카를 통해 consume한 문제 정보를 통해 GPT 응답 생성 
async def consume_problem_summary(topic : str):
    logger.info("listen to 토픽 : " + topic)

    consumer = AIOKafkaConsumer(
        topic,
        bootstrap_servers = kafka_servers,
        value_deserializer=lambda m: json.loads(m.decode("utf-8"))
    )

    await consumer.start()

    try:
        async for msg in consumer:            
            data = ProblemData(**msg.value) # Dict to Class Type (카프카를 통해 consume한 데이터를 Python 클래스 형태로 변환)
            result = await processing(data) # 비즈니스 로직 수행 
            await send("alert", result) # 로직 완료 알림 전송 
    finally:
        await consumer.stop() # anomaly 상태일 때 종료 


# Producer
# 카프카로 메시지 전송 함수 
async def send(topic : str, message):
    logger.info("Send to 토픽 : " + topic)

    producer = AIOKafkaProducer(
        bootstrap_servers = kafka_servers,
        value_serializer = lambda m : m.encode("utf-8") 
    )

    await producer.start()

    await producer.send_and_wait(topic, message)


