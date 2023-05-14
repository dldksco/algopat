package com.auth.service.feign;

import com.auth.exception.CustomFeignException;
import feign.Response;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomErrorDecoder implements ErrorDecoder {

  private final ErrorDecoder defaultErrorDecoder = new Default();

  @Override
  public Exception decode(String methodKey, Response response) {
    String message = response.reason(); // 원격 서버에서 반환된 메시지를 사용합니다.
    return CustomFeignException.create(methodKey, response.status(), message);

  }
}