package com.alert.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {

  @JsonProperty("progress_info")
  private String progressInfo; // 진행 사항 정보

  @JsonProperty("percentage")
  private int percentage; // 진행 사항 퍼센트

  @JsonProperty("state")
  private String state; // 상태 (ok, finish, error)

  @JsonProperty("user_seq")
  private long userSeq; // 유저 식별 번호
}
