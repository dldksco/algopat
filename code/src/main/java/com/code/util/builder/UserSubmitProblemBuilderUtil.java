package com.code.util.builder;

import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.entity.UserSubmitProblem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserSubmitProblemBuilderUtil {

  public UserSubmitProblemDto userSubmitProblemToUserSubmitProblemDto(UserSubmitProblem userSubmitProblem) {
    return UserSubmitProblemDto.builder()
        .problemId(userSubmitProblem.getProblemId())
        .problemTitle("")
        .problemLevel(1111)
        .build();
  }
}
