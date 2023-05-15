package com.user.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.user.domain.ErrorCode;
import com.user.dto.UserTransactionDTO;
import com.user.exception.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import org.springframework.kafka.support.Acknowledgment;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceListenerImpl implements UserServiceListener {
  private final ObjectMapper objectMapper;
  private final UserService userService;
  @KafkaListener(topics = "user-service", groupId = "usercode", containerFactory = "kafkaListenerContainerFactory")
  public void consumeUserMessage(String message, Acknowledgment acknowledgment) {
    UserTransactionDTO userTransactionDto = null;
    try {

       userTransactionDto= objectMapper.readValue(message, UserTransactionDTO.class);

      log.info("parse kafka userTransaction success");
      acknowledgment.acknowledge();


    } catch (Exception e) {
      log.error("parse kafka userTransaction fail");

      throw new BaseException(ErrorCode.KAFKA_ERROR);
    }
    String isSuccessTransaction = userTransactionDto.getIsSuccess();
    try {
      if(isSuccessTransaction.equals("NO")){
        userService.plusUserSubmitCount(userTransactionDto);
      }else if(isSuccessTransaction.equals("YES")){
        userService.minusUserSubmitCount(userTransactionDto);
      }
    } catch (Exception e) {

      log.error("userTransaction save fail: ");

    }
  }
}
