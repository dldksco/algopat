package com.alert.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserSeq {
  private String userSeq;

  @JsonCreator
  public UserSeq(@JsonProperty("user_seq") String userSeq) {
    this.userSeq = userSeq;
  }

  public String getUserSeq() {
    return userSeq;
  }

  public void setUserSeq(String userSeq) {
    this.userSeq = userSeq;
  }


}
