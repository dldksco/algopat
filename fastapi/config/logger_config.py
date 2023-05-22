import logging

# [시간] - [클래스이름] - [로그레벨] - [데이터] 
def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='[%(asctime)s] - [%(name)s] - [%(levelname)s] - [%(message)s]',
        handlers=[logging.StreamHandler()]
    )

    logging.getLogger("openai").setLevel(logging.ERROR)