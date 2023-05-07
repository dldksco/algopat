package com.code.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSubmitProblemDto {
  private long problemId;
  private String problemTitle;
  private long problemLevel;

}
