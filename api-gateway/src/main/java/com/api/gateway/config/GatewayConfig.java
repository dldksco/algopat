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

  /**
   * SECRETKEY를 통해 Decoding
   * @author Lee an chae
   * @return Key
   *
   */
  private final Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  /**
   * API 라우팅
   * 허용된 경로가 아닐경우 토큰 검사
   * @author Lee an chae
   * @return
   */
  @Bean
  public GlobalFilter customGlobalFilter() {
    return (exchange, chain) -> {

      //요청 URL 경로 확인
      ServerHttpRequest request = exchange.getRequest();
      String requestURL = request.getURI().toString();
      String path = request.getURI().getPath();
      logger.info(requestURL);
      boolean isAllowedPath = ALLOWED_PATHS.stream().anyMatch(path::startsWith);


      String accessToken = request.getHeaders().getFirst("Authorization");

      //인증이 필요하지 않을 경로일 경우 바로 다음 필터로 넘어갑니다.
      if (isAllowedPath) {
        log.info("isAllowdPath");
        if(path.startsWith("/auth")){
          return chain.filter(exchange);
        }
        if (accessToken == null) {
          log.info("isAllowedPath and accesToken is null");
          return chain.filter(exchange);
        }
      }

      //엑세스 토큰이 존재하지 않을 경우 403 FORBIDDEN Error 발생
        if (accessToken == null) {
          exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
          return exchange.getResponse().setComplete();
        }
      //토큰 유효성 검사 시작
        try {
          Jws<Claims> claimsJws = Jwts.parserBuilder()
              .setSigningKey(getSigningKey())
              .build()
              .parseClaimsJws(accessToken);
          log.info("validate accessToken");
          try{
            // 헤더에 파싱된 토큰의 userSeq를 담아 다른 서비스에 넘겨줍니다.
            Long userSeq = claimsJws.getBody().get("userSeq",Long.class);

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

    };
  }
}