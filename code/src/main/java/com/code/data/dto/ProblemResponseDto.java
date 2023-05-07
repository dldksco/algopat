package com.code.data.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProblemResponseDto {
  long problemId;

  String problemTitle;

  long problemLevel;

  String problemDesc;

  String problemInput;

  String problemOutput;

  List<String> problemTagList;

  String problemLimit;

  long problemTimeLimit;

  long problemSpaceLimit;

}
