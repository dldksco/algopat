package com.user.dto;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserTransactionDTO {

  private String isSuccess;
  private long userSeq;

  @JsonAnySetter
  public void setAny(String key, String value) {
    if ("isSuccess".equalsIgnoreCase(key) || "is_success".equalsIgnoreCase(key)) {
      this.isSuccess = value;
    }
  }
}
