package com.alert.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;


public class MessageDto {
  private String progress;
  private Payload payload;
  private UserSeq userSeq;

  @JsonCreator
  public MessageDto(
      @JsonProperty("progress") String progress,
      @JsonProperty("payload") Payload payload,
      @JsonProperty("user_seq") UserSeq userSeq) {
    this.progress = progress;
    this.payload = payload;
    this.userSeq = userSeq;
  }

  public String getProgress() {
    return progress;
  }

  public Payload getPayload() {
    return payload;
  }

  public UserSeq getUserSeq() {
    return userSeq;
  }

  public void setProgress(String progress) {
    this.progress = progress;
  }

  public void setPayload(Payload payload) {
    this.payload = payload;
  }

  public void setUserSeq(UserSeq userSeq) {
    this.userSeq = userSeq;
  }
}
