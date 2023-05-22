package com.code.service;

import com.code.data.domain.ErrorCode;
import com.code.exception.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaRetryServiceImpl implements KafkaRetryService {

  private static final int MAX_RETRY_COUNT = 7;
  private static final int RETRY_DELAY_MS = 150;

  private final KafkaTemplate<String, String> kafkaTemplate;

  /**
   * 카프카 메세지 생성에 실패했다면 원하는 횟수, sleep 시간을 토대로 재시도를합니다.
   * 일정 재시도 횟수 초과시 에러를 발생시킵니다.
   *
   * @author Lee an chae, Lee chan hee
   * @param topic
   * @param message
   */

  public void sendWithRetry(String topic, String message) {
    int retryCount = 0;

    while (retryCount < MAX_RETRY_COUNT) {
      try {
        ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic, message);
        future.addCallback(new ListenableFutureCallback<>() {
          @Override
          public void onSuccess(SendResult<String, String> result) {
            log.info("send Kafka topic : " + topic + " message : " + message + " success");
          }
          @Override
          public void onFailure(Throwable ex) {
            log.warn("send Kafka topic : " + topic + " message : " + message + " fail");
          }
        });

        break;
      } catch (RuntimeException e) {
        log.warn("Kafka Retry 에러 발생");
        retryCount++;
        if (retryCount == MAX_RETRY_COUNT) {
          log.error("send Kafka retry fail");
          throw new BaseException(ErrorCode.KAFKA_ERROR,"sendWithRetry");
        }
        try {
          log.warn("retry Kafka sleep");
          Thread.sleep(RETRY_DELAY_MS);
        } catch (InterruptedException ie) {
          log.error("Interrupt thread while retry kafka");
          Thread.currentThread().interrupt();
        }
      }
    }
  }
}


