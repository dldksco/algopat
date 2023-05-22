package com.auth.config;

import com.auth.interceptor.FeignClientInterceptor;
import com.auth.service.feign.CustomErrorDecoder;
import feign.RequestInterceptor;
import feign.codec.ErrorDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class FeignClientConfiguration {
//  private final FeignClientInterceptor feignClientInterceptor;

//  @Bean
//  public RequestInterceptor requestInterceptor() {
//    return feignClientInterceptor;
//  }

  /**
   * Feign Client Error처리를 위해 CustomErrorDecoder를 등록합니다
   * @author Lee an chae
   * @return
   */
  @Bean
  public ErrorDecoder errorDecoder() {
    return new CustomErrorDecoder();
  }
}
