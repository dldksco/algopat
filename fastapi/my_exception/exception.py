class DuplicateSubmissionError(Exception):
    def __init__(self, message="회원 제출 코드 중복"):
        self.message = message
        super().__init__(self.message)
