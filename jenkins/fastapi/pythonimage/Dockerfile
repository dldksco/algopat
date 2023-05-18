FROM tiangolo/uvicorn-gunicorn:python3.10

RUN apt-get update && apt-get install -y gcc wget
RUN apt-get remove -y libmariadb3 libmariadb-dev
RUN apt-get install libmariadb3 libmariadb-dev
RUN wget https://downloads.mariadb.com/Connectors/c/connector-c-3.3.4/mariadb-connector-c-3.3.4-src.tar.gz -O - | tar -zxf - --strip-components=1 -C /usr
RUN pip install --upgrade pip

RUN apt-get install -y ffmpeg

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt
