package com.code.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

  private final KafkaTemplate<String, String> kafkaTemplate;

  private final ObjectMapper objectMapper;

  public void send(String topic, Object object) throws JsonProcessingException {
    String jsonString = objectMapper.writeValueAsString(object);
    System.out.println("데이터 전송!!: " + jsonString);
    kafkaTemplate.send(topic, jsonString);
  }


}
