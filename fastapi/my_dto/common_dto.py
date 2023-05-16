from pydantic import BaseModel, Field
# Kafka -> Alert  DTO 
class MessageDTO(BaseModel):
    progress_info   : str # 진행 정보 (수행중인 작업)
    percentage      : int # 진행 퍼센트 (25%, 50% 등) 
    state           : str # 상태 (ok, finish, error)
    user_seq        : int # 유저 식별 번호 


# Fast API -> User DTO  (실패시) 
class UserServiceDTO(BaseModel):
    isSuccess  : str  # 이벤트 성공 / 실패 
    userSeq    : int  # 유저 식별 번호 