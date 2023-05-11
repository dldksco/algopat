from pydantic import BaseModel
# Kafka -> Alert  DTO 
class MessageDTO(BaseModel):
    progress : str 
    message  : str 
    user_seq : int 