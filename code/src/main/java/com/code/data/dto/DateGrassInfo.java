package com.code.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DateGrassInfo {
  private long submissionId;
  private long problemId;

  private String problemTitle;

  private long problemLevel;
}
