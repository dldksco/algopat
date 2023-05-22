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

  /**
   * 카프카에서 메세지를 꺼내옵니다
   * 꺼내온 메세지에서 isSuccessTransaction이 YES면 유저 제출 횟수를 -1, 아닐 경우 트랜잭션에 실패했다고 판단해 +1을 해줍니다
   * @author Lee an chae
   * @param message
   * @param acknowledgment
   */
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
