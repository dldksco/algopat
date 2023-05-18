FROM docker.elastic.co/elasticsearch/elasticsearch:7.17.9

# 사용자 지정 설정 파일 추가
COPY ./config/elasticsearch.yml /usr/share/elasticsearch/config/
COPY ./config/jvm.options /usr/share/elasticsearch/config/
EXPOSE 9200
# Elasticsearch 플러그인 설치
RUN /usr/share/elasticsearch/bin/elasticsearch-keystore create
RUN echo "<your-password>" | /usr/share/elasticsearch/bin/elasticsearch-keystore add -x 'bootstrap.password'
