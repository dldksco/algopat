package com.user.aop;

import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

  /**
   * 각 메소드들의 시작과 끝에 로그를 달아줍니다.
   * @author Lee an chae
   * @param joinPoint
   * @return
   * @throws Throwable
   */
  @Around("execution(* com.user.controller..*.*(..)) || execution(* com.user.service..*.*(..))")
  public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {

    log.info("Start " + joinPoint.getSignature().getName());
    long start = System.currentTimeMillis();
    Object result =null;
    try{
      result = joinPoint.proceed(); // continue on the intercepted method
    }finally {
      long elapsedTime = System.currentTimeMillis() - start;
      log.info("End " + joinPoint.getSignature().getName()+" elapsed time: "+ elapsedTime+"ms");

    }
    return result;


  }

}