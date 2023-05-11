package com.code.exception;

import feign.FeignException;


public class CustomFeignException extends FeignException {
  private final String methodKey;

  protected CustomFeignException(String methodKey, int status, String message) {
    super(status, message);
    this.methodKey = methodKey;
  }

  public static CustomFeignException create(String methodKey, int status, String message) {
    return new CustomFeignException(methodKey, status, message);
  }
}