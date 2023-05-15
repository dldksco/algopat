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

  private static final int MAX_RETRY_COUNT = 3;
  private static final int RETRY_DELAY_MS = 10;

  private final KafkaTemplate<String, String> kafkaTemplate;


  public void sendWithRetry(String topic, String message) {
    int retryCount = 0;

    while (retryCount < MAX_RETRY_COUNT) {
      try {
        ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic, message);

        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
          @Override
          public void onSuccess(SendResult<String, String> result) {
          log.info("send Kafka topic : "+topic+" message : "+ message+" success");
          }

          @Override
          public void onFailure(Throwable ex) {
            log.warn("send Kafka topic : "+topic+" message : "+ message+" fail");
          }
        });

        break;
      } catch (Exception e) {
        retryCount++;

        if (retryCount == MAX_RETRY_COUNT) {
          log.error("send Kafka retry fail");
          throw new BaseException(ErrorCode.KAFKA_ERROR,"sendWithRetry");
        }

        try {
          log.warn("retry Kafka sleep");
          Thread.sleep(RETRY_DELAY_MS);
        } catch (InterruptedException ie) {
          Thread.currentThread().interrupt();
          log.error("Interrupt thread while retry kafka");

        }
      }
    }
  }
}
