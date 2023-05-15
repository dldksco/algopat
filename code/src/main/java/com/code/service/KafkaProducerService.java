package com.code.service;

import com.code.data.domain.ErrorCode;
import com.code.data.dto.UserSubmitTransactionDto;
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

  private final KafkaRetryServiceImpl kafkaRetryService;
  private final int MAX_RETRY_COUNT =3;



  private final int RETRY_DELAY_MS = 10;

  public void send(String topic, Object object) throws JsonProcessingException {
    String jsonString = objectMapper.writeValueAsString(object);

    try {
      kafkaTemplate.send(topic, jsonString);
    } catch (Exception e) {
      String methodName = "KafkaProducer.send";
      throw new BaseException(ErrorCode.KAFKA_ERROR, methodName);
    }

  }

  public void sendUserSubmitTransactionDto(String topic, UserSubmitTransactionDto userSubmitTransactionDto) throws JsonProcessingException {
    String jsonString = objectMapper.writeValueAsString(userSubmitTransactionDto);

    kafkaRetryService.sendWithRetry(topic, jsonString);
  }


}


