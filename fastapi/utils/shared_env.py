import os 
from dotenv import load_dotenv

load_dotenv()

mariadb_config = os.environ.get("MARIADB_CONFIG")
redis_url = os.environ.get("REDIS_URL")
open_ai_api_key = os.environ.get("OPEN_AI_API_KEY")