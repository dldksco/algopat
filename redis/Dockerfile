FROM redis:7.0.7

# 시작 지점설정

RUN mkdir -p /etc/redis

# 레디스 설정 복사
COPY ./config/redis.conf /etc/redis/redis.conf

# 설정으로 시작하게 만들음.

CMD ["redis-server", "/etc/redis/redis.conf"]
