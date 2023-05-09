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
import org.springframework.web.server.ServerWebExchange;

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
      String path = request.getURI().getPath();
      System.out.println(k+"==============");
      if (path.startsWith("/auth/") || path.startsWith("/user/che")|| path.startsWith("/sse")) {
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
          Long userSeq = claimsJws.getBody().get("user_seq",Long.class);
          // 헤더 추가
          ServerHttpRequest modifiedRequest = request.mutate()
              .header("user_seq",userSeq.toString())
              .build();
          System.out.println("헤더검사 : "+ userSeq.toString());
          // 교환 기능에 변경된 요청 전달
          ServerWebExchange modifiedExchange = exchange.mutate().request(modifiedRequest).build();
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