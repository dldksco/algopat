//package com.auth.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//
//@Configuration
//public class RedisConfig {
//  @Value("${redis.host}")
//  private String redisHost;
//
//  @Value("${redis.port}")
//  private int redisPort;
//
//  @Value("${redis.password}")
//  private String redisPassword;
//
//  @Bean
//  public LettuceConnectionFactory redisConnectionFactory() {
//    //레디스 아이피, 포트번호 설정
//
//    RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(redisHost, redisPort);
//    redisStandaloneConfiguration.setPassword(redisPassword);
//
//    return new LettuceConnectionFactory(redisStandaloneConfiguration);
//
//
//  }
//}
