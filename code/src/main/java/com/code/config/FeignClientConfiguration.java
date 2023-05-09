package com.code.config;

import com.code.service.fegin.CustomErrorDecoder;
import feign.RequestInterceptor;
import feign.codec.ErrorDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class FeignClientConfiguration {


  @Bean
  public ErrorDecoder errorDecoder() {
    return new CustomErrorDecoder();
  }
}