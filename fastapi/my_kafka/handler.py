from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from processing.processing import processing
from myclass.problem import ProblemData
import json

kafka_servers = ["localhost:9092", "localhost:9093", "localhost:9094"]

async def consume_problem_summary(topic : str):
    print("topic : " + topic)
    consumer = AIOKafkaConsumer(
        topic,
        bootstrap_servers = kafka_servers,
        value_deserializer=lambda m: json.loads(m.decode("utf-8"))
    )
    await consumer.start()
    try:
        async for msg in consumer:
            print("로직 실행 !!!")
            
            data = ProblemData(**msg.value)
            
            await processing(data)
    finally:
        await consumer.stop()

async def send_alert(topic : str, message):
    print("topic : " + topic)
    producer = AIOKafkaProducer(
        bootstrap_servers = kafka_servers,
        value_serializer = lambda m : m.encode("utf-8")
    )

    await producer.start()

    await producer.send_and_wait(topic, message)


