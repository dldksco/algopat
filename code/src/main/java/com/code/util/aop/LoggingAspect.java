package com.code.util.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

  @Around("execution(* com.code.controller..*.*(..)) || execution(* com.code.service..*.*(..))")
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
