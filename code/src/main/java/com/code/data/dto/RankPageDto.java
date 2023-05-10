package com.code.data.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RankPageDto {
  ProblemRankDetailDto masterUserProblemRank;
  ProblemSimpInfoDto problemSimpInfo;
  long solutionCount;

}
