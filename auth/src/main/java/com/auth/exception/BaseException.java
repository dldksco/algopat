package com.auth.exception;

import com.auth.domain.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

  private ErrorCode errorCode;

  private HttpStatus httpStatus;

  public BaseException(ErrorCode errorCode) {
    this.errorCode = errorCode;
    this.httpStatus = errorCode.getStatus();
  }

  @Override
  public String getMessage() {
    return errorCode.getMessage();
  }


}