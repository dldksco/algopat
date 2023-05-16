package com.user.service;

import org.springframework.kafka.support.Acknowledgment;

public interface UserServiceListener {
  public void consumeUserMessage(String message, Acknowledgment acknowledgment);
  }
