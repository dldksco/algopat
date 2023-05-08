package com.api.gateway.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;

@Configuration
public class GatewayConfig {

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
      String k = request.getURI().toString();
      String path = request.getURI().toString();
      System.out.println(k+"==============");
      if (path.startsWith("/auth/")) {
        // 인증 서버로의 요청은 다른 필터를 건너뛰고 직접 전달합니다.
        System.out.println("어스서버로~");
        return chain.filter(exchange);
      } else {

        String accessToken = request.getHeaders().getFirst("Authorization");

        if (accessToken == null) {
          exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
          System.out.println("널값");
          return exchange.getResponse().setComplete();

        }

        try {
          System.out.println(accessToken);
          Jws<Claims> claimsJws = Jwts.parserBuilder()
              .setSigningKey(getSigningKey())
              .build()
              .parseClaimsJws(accessToken);
          // 토큰이 유효한 경우 요청을 계속 진행합니다.
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