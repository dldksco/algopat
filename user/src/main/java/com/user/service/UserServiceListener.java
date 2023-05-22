package com.user.service;

import org.springframework.kafka.support.Acknowledgment;

public interface UserServiceListener {
  /**
   * 카프카에서 메세지를 꺼내옵니다
   * 꺼내온 메세지에서 isSuccessTransaction이 YES면 유저 제출 횟수를 -1, 아닐 경우 트랜잭션에 실패했다고 판단해 +1을 해줍니다
   * @author Lee an chae
   * @param message
   * @param acknowledgment
   */
  public void consumeUserMessage(String message, Acknowledgment acknowledgment);
  }
