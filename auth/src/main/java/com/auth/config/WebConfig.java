package com.auth.config;

import com.auth.filter.CustomCorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
  public FilterRegistrationBean<CustomCorsFilter> customCorsFilterRegistration() {
    FilterRegistrationBean<CustomCorsFilter> registration = new FilterRegistrationBean<>();
    registration.setFilter(new CustomCorsFilter());
    registration.addUrlPatterns("/*");
    registration.setName("customCorsFilter");
    registration.setOrder(1);
    return registration;
  }
}
