package com.auth.domain;

import org.springframework.http.HttpStatus;

public enum TokenStatus {
  VALID(HttpStatus.OK,"토큰이 유효합니다"),
  EXPIRED(HttpStatus.UNAUTHORIZED,"토큰이 만료되었습니다"),
  INVALID(HttpStatus.BAD_REQUEST,"토큰이 타당하지 않습니다"),
  ISSUED_ACCESS_TOKEN(HttpStatus.OK, "엑세스 토큰 발급 완료"),
  ISSUED_REFRESH_TOKEN(HttpStatus.OK, "리프레쉬 토큰 발급 완료"),
  TOKEN_NOT_FOUND(HttpStatus.FORBIDDEN,"토큰이 존재하지 않습니다");

  private final HttpStatus httpStatus;
  private final String message;
  TokenStatus(HttpStatus httpStatus, String message){
    this.httpStatus=httpStatus;
    this.message=message;
  }
  public HttpStatus getStatus() {
    return httpStatus;
  }
  public String getMessage() {
    return message;
  }
}
