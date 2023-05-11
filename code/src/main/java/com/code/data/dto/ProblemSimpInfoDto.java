package com.code.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProblemSimpInfoDto {
  long problemLevel;
  String problemTitle;
}
