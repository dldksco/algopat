package com.auth.exception;

import com.auth.domain.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

  private ErrorCode errorCode;

  private HttpStatus httpStatus;
  private String methodName;

  public BaseException(ErrorCode errorCode, String methodName) {
    this.errorCode = errorCode;
    this.methodName = methodName;
    this.httpStatus = errorCode.getStatus();
  }

  @Override
  public String getMessage() {
    return errorCode.getMessage();
  }


}