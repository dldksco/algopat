package com.alert.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

  private final KafkaTemplate<String, String> kafkaTemplate;

  public void sendMessage(String topic, String username, String message) {
    kafkaTemplate.send(topic, username, message);
  }
}
