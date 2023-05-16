package com.auth.domain;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
  REQUEST_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "요청에 실패하였습니다."),
  UNVALID_USER(HttpStatus.UNAUTHORIZED, "권한 없는 유저입니다."),

  OAUTH_REQUIRE(HttpStatus.UNAUTHORIZED, "소셜 인증이 이뤄지지 않은 유저입니다. 소셜 로그인을 선행해주세요."),
  TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
  UNVALID_TOKEN(HttpStatus.UNAUTHORIZED, "인증되지 않은 토큰입니다."),
  ACCESS_TOKEN_NULL(HttpStatus.INTERNAL_SERVER_ERROR, "access token이 존재하지 않는 요청입니다."),
  ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "access token이 만료되었습니다. 재발급을 요청하세요."),
  REFRESH_TOKEN_EXPIRED(HttpStatus.CONFLICT, "refresh token이 만료되었습니다. 다시 로그인해주세요."),
  USER_POST_UNAUTHORIZED(HttpStatus.INTERNAL_SERVER_ERROR, "post 요청에 대해 권한이 없는 유저입니다."),
  AUTHENTICATE_ERROR(HttpStatus.CONFLICT, "인증 과정에서 에러가 발생했습니다."),

  DUPLICATE_LOGIN(HttpStatus.CONFLICT,"이미 로그인 중입니다."),
  FILE_CONVERT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"파일 저장에 실패했습니다."),

  UNVALID_PARAMETER(HttpStatus.NOT_FOUND,"요청 파라미터를 확인해주세요."),


  //500
  //  1. db 관련 에러
  DATABASE_GET_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"해당 객체를 찾을 수 없습니다. 식별자를 확인해주세요"),
  DATABASE_UPDATE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "해당 객체를 업데이트할 수 없습니다. 속성값 이름, 값의 존재 유무, 식별자를 확인해주세요."),
  DATABASE_INSERT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "해당 객체를 데이터베이스에 생성할 수 없습니다."),
  DATABASE_DELETE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "해당 객체를 데이터베이스에서 삭제할 수 없습니다."),

  //  2. 토큰 관련 에러
  TOKEN_ALLOCATE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "jwt 토큰 발급 중 에러가 발생했습니다. 유저 식별자와 권한을 확인해주세요."),
  TOKEN_CLAIM_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "토큰에서 클레임을 추출할 수 없습니다."),
  REFRESH_TOKEN_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "리프레시 토큰을 찾을 수 없습니다."),
  TOKEN_UNKNOWN_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "jwt 토큰 인가 과정 중 알 수 없는 에러가 발생했습니다."),

  //  3. 파일 관련 에러
  FILE_DIRECTORY_MAKE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "디렉토리 생성 중 에러가 발생했습니다."),
  FILE_SIZE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일의 크기가 비정상적입니다."),
  FILE_FORMAT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "지원하지 않는 파일 포맷입니다. jpg, png, jpeg인지 확인해주세요."),
  FILE_SAVE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일 변환 및 로컬 저장 과정에서 에러가 발생했습니다."),
  FILE_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일 s3 서버 업로드 과정에서 에러가 발생했습니다."),
  FILE_DELETE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일 로컬 삭제 과정에서 에러가 발생했습니다."),

  S3_CLIENT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "유효하지 않은 S3 클라이언트입니다."),


  // 핸들링되지 않은 에러
  SERVICE_SERVLET_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서비스단에서 에러가 발생했습니다."),

  CONTROLLER_SERVLET_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "컨트롤러단에서 에러가 발생했습니다.");


  private final HttpStatus status;
  private final String message;

  ErrorCode(HttpStatus status, String message) {
    this.status = status;
    this.message = message;
  }
}
