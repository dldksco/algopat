import os 
from dotenv import load_dotenv

load_dotenv()

mariadb_config = os.environ.get("MARIADB_CONFIG")