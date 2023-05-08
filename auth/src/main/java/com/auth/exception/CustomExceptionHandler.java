package com.auth.exception;

import com.auth.dto.ErrorResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    ErrorResponseDTO errorresponseDTO = ErrorResponseDTO.builder()
        .message(baseException.getMessage())
        .build();
    return new ResponseEntity<>(errorresponseDTO, baseException.getHttpStatus());
  }

  @ExceptionHandler(CustomFeignException.class)
  public ResponseEntity<String> handleCustomFeignException(CustomFeignException ex) {
    HttpStatus status = HttpStatus.valueOf(ex.status());
    return new ResponseEntity<>(ex.getMessage(), status);
  }



}
