class MyCustomError(Exception):
    def __init__(self, message="서버 에러 발생"):
        self.message = message
        super().__init__(self.message)
