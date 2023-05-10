
# Kafka -> Alert  DTO 
class MessageDTO:
    def __init__(self, method_name: str, payload: dict, user_seq : int):
        self.method_name = method_name
        self.payload = payload
        self.user_seq = user_seq

    def to_dict(self):
        return {
            "method_name": self.method_name, # 메소드 이름 
            "payload": self.payload, # 메시지 
            "user_seq": self.user_seq # 유저 식별번호 
        }