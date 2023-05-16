package com.code.service;

public interface KafkaRetryService {
  public void sendWithRetry(String topic, String message);
  }
