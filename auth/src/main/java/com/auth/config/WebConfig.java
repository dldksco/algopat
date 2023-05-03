package com.auth.config;

import com.auth.filter.CustomCorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//  @Override
//  public void addCorsMappings(CorsRegistry registry) {
//    registry.addMapping("/**")
//        .allowedOriginPatterns("*")
//        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
//        .allowCredentials(true)
//        .maxAge(3600)
//        .allowedHeaders("*");
//  }
  @Bean
  public CorsFilter corsFilter() {
    // URL 패턴을 기반으로 한 CORS 구성을 관리
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

  // CorsConfiguration 객체를 생성
  // 이 객체에 모든 출저, 헤더 및 HTTP 메소드를 허용하도록 구성
    CorsConfiguration config = new CorsConfiguration();

    config.addAllowedOriginPattern("*");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    config.setAllowCredentials(true);
    config.setMaxAge(3600L);

  // CORS 구성에 등록
  // API 경로와 그 외 모든 경로에 대한 요청이 CORS 정책에 따라 허용됨
    source.registerCorsConfiguration("/test/**", config);
    source.registerCorsConfiguration("/api/**", config);
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
  @Bean
  public FilterRegistrationBean<CustomCorsFilter> customCorsFilterRegistration() {
    FilterRegistrationBean<CustomCorsFilter> registration = new FilterRegistrationBean<>();
    registration.setFilter(new CustomCorsFilter());
    registration.addUrlPatterns("/*");
    registration.setName("customCorsFilter");
    registration.setOrder(1);
    return registration;
  }
}
