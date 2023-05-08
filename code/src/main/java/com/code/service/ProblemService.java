package com.code.service;

import com.code.data.domain.ErrorCode;
import com.code.data.dto.ProblemResponseDto;
import com.code.data.dto.UserSubmissionSolutionDetailDto;
import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.dto.UserSubmitSolutionTitleDto;
import com.code.data.entity.Problem;
import com.code.data.repository.ProblemRepository;
import com.code.data.repository.UserSubmitProblemRepository;
import com.code.exception.BaseException;
import com.code.util.builder.ProblemBuilderUtil;
import com.code.util.builder.UserSubmitProblemBuilderUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProblemService {
  // logger 정의
  private static final Logger logger = LoggerFactory.getLogger(ProblemService.class);
  // Repository 정의
  private final ProblemRepository problemRepository;
  private final UserSubmitProblemRepository userSubmitProblemRepository;
  // Util 정의
  private final ProblemBuilderUtil problemBuilderUtil;
  private final UserSubmitProblemBuilderUtil userSubmitProblemBuilderUtil;

  public ProblemResponseDto getProblem(long problemId) {
    logger.info("문제 조회");
    Problem problem = problemRepository.findById(problemId).orElseThrow(() -> new BaseException(ErrorCode.RESOURCE_NOT_FOUND, "getProblem"));
    return problemBuilderUtil.problemToProblemResponseDto(problem);
  }

  public Page<UserSubmitProblemDto> getUserSubmitProblemDtoPage(int page, long userSeq) {
    PageRequest pagable = PageRequest.of(page, 10, Sort.by(Direction.DESC, "userSubmitProblemUpdatedAt"));
    Page<UserSubmitProblemDto> userSubmitProblemDtoPage = userSubmitProblemRepository.findUserSubmitProblemDtoByUserSeq(userSeq, pagable);
    return userSubmitProblemDtoPage;
  }

  public Page<UserSubmitSolutionTitleDto> getUserSubmitSolutionTitleDtoPage(int page, long userSeq, long problemId) {
    PageRequest pagable = PageRequest.of(page, 10, Sort.by(Direction.DESC, "userSubmitSolutionTime"));
    Page<UserSubmitSolutionTitleDto> userSubmitSolutionTitleDtoPage = userSubmitProblemRepository.findUserSubmitSolutionTitleByUserSeq(userSeq, problemId, pagable);
    return userSubmitSolutionTitleDtoPage;
  }

  public UserSubmissionSolutionDetailDto getUserSubmitSolutionDetailDto(long submissionId) {
    UserSubmissionSolutionDetailDto userSubmissionSolutionDetailDto = userSubmitProblemRepository.findUserSubmitSolutionDetailBySubmissionId(submissionId)
        .orElseThrow(RuntimeException::new);
    return userSubmissionSolutionDetailDto;
  }
}
