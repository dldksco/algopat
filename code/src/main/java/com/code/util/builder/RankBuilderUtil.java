package com.code.util.builder;

import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemSimpInfoDto;
import com.code.data.dto.RankPageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RankBuilderUtil {

  public RankPageDto rankPageDtoBuilder(ProblemSimpInfoDto problemSimpInfoDto, ProblemRankDetailDto masterUserProblemRank, long count) {
    return RankPageDto.builder()
        .problemSimpInfo(problemSimpInfoDto)
        .masterUserProblemRank(masterUserProblemRank)
        .solutionCount(count)
        .build();
  }
}
