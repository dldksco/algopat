package com.code.data.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProblemSimpInfoDto {
  long problemLevel;
  String problemTitle;
}
