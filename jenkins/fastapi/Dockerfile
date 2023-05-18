FROM woonchoi/fastapi:latest

WORKDIR /code

COPY . .

EXPOSE 8000

RUN mkdir /logs

CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
