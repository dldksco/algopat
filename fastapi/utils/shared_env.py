import os 
from dotenv import load_dotenv

load_dotenv()

mariadb_config = os.environ.get("MARIADB_CONFIG")
redis_url = os.environ.get("REDIS_URL")