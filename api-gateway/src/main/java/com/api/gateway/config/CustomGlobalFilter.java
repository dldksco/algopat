package com.api.gateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

// 인증, 인가 Filter
@Configuration
public class CustomGlobalFilter implements GlobalFilter {

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    //    Header로 JWT 넘겨받기 로직
    //    String tokenA = exchange.getRequest().getHeaders().getFirst("tokenA");
    //    System.out.println(tokenA);

    // Todo : JWT 체크 로직
    if (true) {
      System.out.println("권한 확인 완료!!!");
      return chain.filter(exchange);
    } else {
      exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
      System.out.println("권한 없음 !!!!!!");
      return exchange.getResponse().setComplete();
    }
  }
}
