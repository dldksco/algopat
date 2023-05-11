package com.auth.exception;

import com.auth.dto.ErrorResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@RestControllerAdvice
public class CustomExceptionHandler{
  private final RestTemplate restTemplate;

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<ErrorResponseDTO> handleCustomException(BaseException baseException) {
//    sendToLogServer(ex.getMessage(), ex.getMethodName());
    ErrorResponseDTO errorresponseDTO = ErrorResponseDTO.builder()
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
