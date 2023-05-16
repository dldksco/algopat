package com.code.util.builder;

import com.code.data.dto.ProblemResponseDto;
import com.code.data.dto.UserSubmittedProblemIdListDto;
import com.code.data.entity.Problem;
import com.code.util.common.CommonUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProblemBuilderUtil {
  // util 정의
  private final CommonUtil commonUtil;

  // problem -> ProblemResponseDto
  public ProblemResponseDto problemToProblemResponseDto(Problem problem) {
    return ProblemResponseDto.builder()
        .problemId(problem.getProblemId())
        .problemTitle(problem.getProblemTitle())
        .problemLevel(problem.getProblemLevel())
        .problemDesc(problem.getProblemDesc())
        .problemInput(problem.getProblemInput())
        .problemOutput(problem.getProblemOutput())
        .problemTagList(commonUtil.parseString(problem.getProblemTag()))
        .problemLimit(problem.getProblemLimit())
        .problemTimeLimit(problem.getProblemTimeLimit())
        .problemSpaceLimit(problem.getProblemSpaceLimit())
        .build();
  }

}
