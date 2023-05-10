
# Kafka -> Alert  DTO 
class MessageDTO:
    def __init__(self, progress: str, payload: dict, user_seq : int):
        self.progress = progress
        self.payload = payload
        self.user_seq = user_seq

    def to_dict(self):
        return {
            "progress": self.progress, # 메소드 이름 
            "payload": self.payload, # 메시지 
            "user_seq": self.user_seq # 유저 식별번호 
        }