package com.auth.exception;

import feign.FeignException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomFeignException extends FeignException {
  private final String methodKey;

  protected CustomFeignException(String methodKey, int status, String message) {
    super(status, message);
    this.methodKey = methodKey;
  }

  public static CustomFeignException create(String methodKey, int status, String message) {
    log.error("create feginException");
    log.debug("methodkey : "+ methodKey+" status : "+ status+" message: "+message);
    return new CustomFeignException(methodKey, status, message);
  }
}
