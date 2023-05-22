package com.code.service;

public interface KafkaRetryService {
  /**
   * 카프카 메세지 생성에 실패했다면 원하는 횟수, sleep 시간을 토대로 재시도를합니다.
   * 일정 재시도 횟수 초과시 에러를 발생시킵니다.
   *
   * @author Lee an chae, Lee chan hee
   * @param topic
   * @param message
   */
  public void sendWithRetry(String topic, String message);
  }
