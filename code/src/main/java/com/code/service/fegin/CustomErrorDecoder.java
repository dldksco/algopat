package com.code.service.fegin;

import com.code.exception.CustomFeignException;
import feign.Response;
import feign.codec.ErrorDecoder;

public class CustomErrorDecoder implements ErrorDecoder {

  private final ErrorDecoder defaultErrorDecoder = new Default();

  @Override
  public Exception decode(String methodKey, Response response) {
    String message = response.reason(); // 원격 서버에서 반환된 메시지를 사용합니다.
    return CustomFeignException.create(methodKey, response.status(), message);

  }
}