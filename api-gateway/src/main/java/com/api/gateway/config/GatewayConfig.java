package com.api.gateway.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

@Configuration
@Slf4j
public class GatewayConfig {
  private static final Logger logger = LoggerFactory.getLogger(GatewayConfig.class);
  private static final List<String> ALLOWED_PATHS = Arrays.asList("/auth/", "/user/che", "/sse", "/rank");

  @Value("${secret-key}")
  private String SECRET_KEY;

  private final Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  @Bean
  public GlobalFilter customGlobalFilter() {
    return (exchange, chain) -> {
      ServerHttpRequest request = exchange.getRequest();
      String requestURL = request.getURI().toString();
      String path = request.getURI().getPath();
      logger.info(requestURL);
      boolean isAllowedPath = ALLOWED_PATHS.stream().anyMatch(path::startsWith);

      if (isAllowedPath) {
        return chain.filter(exchange);
      } else {

        String accessToken = request.getHeaders().getFirst("Authorization");

        if (accessToken == null) {
          exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
          return exchange.getResponse().setComplete();

        }

        try {
          System.out.println(accessToken);
          Jws<Claims> claimsJws = Jwts.parserBuilder()
              .setSigningKey(getSigningKey())
              .build()
              .parseClaimsJws(accessToken);
          System.out.println("검사완료");
          try{
            Long userSeq = claimsJws.getBody().get("userSeq",Long.class);
            // 헤더 추가
            ServerHttpRequest modifiedRequest = request.mutate()
                .header("userSeq",userSeq.toString())
                .build();
            System.out.println("헤더검사 : "+ userSeq.toString());
            // 교환 기능에 변경된 요청 전달
            ServerWebExchange modifiedExchange = exchange.mutate().request(modifiedRequest).build();
          }catch (Exception e){
            throw new ExpiredJwtException(claimsJws.getHeader(), claimsJws.getBody(), "user seq가 존재하지 않습니다");
          }

          return chain.filter(exchange);
        } catch (ExpiredJwtException e) {
          exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
          return exchange.getResponse().setComplete();
        } catch (JwtException e) {
          exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
          return exchange.getResponse().setComplete();
        }
      }
    };
  }
}