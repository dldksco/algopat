package com.code.exception;

import com.code.data.dto.ErrorResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice
public class CustomExceptionHandler{
//  private final RestTemplate restTemplate;

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<ErrorResponseDto> handleCustomException(BaseException baseException) {
//    sendToLogServer(ex.getMessage(), ex.getMethodName());
    ErrorResponseDto errorresponseDTO = ErrorResponseDto.builder()
        .message(baseException.getMessage())
        .methodName(baseException.getMethodName())
        .build();
    return new ResponseEntity<>(errorresponseDTO, baseException.getHttpStatus());
  }

//  private void sendToLogServer(String errorMessage, String methodName) {
//    String logServerUrl = "http://localhost:2080";
//    LogRequest logRequest = new LogRequest(errorMessage, methodName);
//
//    restTemplate.postForEntity(logServerUrl, logRequest, Void.class);
//  }
}

