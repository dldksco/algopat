package com.code.service;

import com.code.data.domain.ErrorCode;
import com.code.exception.BaseException;
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

    try {
      kafkaTemplate.send(topic, jsonString);
    } catch (Exception e) {
      String methodName = "KafkaProducer.send";
      throw new BaseException(ErrorCode.KAFKA_ERROR, methodName);
    }

  }


}
