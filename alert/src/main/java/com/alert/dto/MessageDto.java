package com.alert.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
  private String progress; // 진행 사항
  private String message; // 데이터
  @JsonProperty("user_seq")
  private long userSeq; // 유저 식별 번호
}
