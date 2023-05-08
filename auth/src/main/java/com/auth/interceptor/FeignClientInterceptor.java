package com.auth.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FeignClientInterceptor implements RequestInterceptor {
  @Value("${internal-token}")
  private String internalToken;
  @Override
  public void apply(RequestTemplate requestTemplate) {
    requestTemplate.header("Authorization",internalToken);
  }
}
