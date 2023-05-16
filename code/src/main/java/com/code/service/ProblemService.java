package com.code.service;

import com.code.data.domain.ErrorCode;
import com.code.data.dto.CommonBooleanDto;
import com.code.data.dto.ProblemResponseDto;
import com.code.data.dto.UserSubmissionSolutionDetailDto;
import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.dto.UserSubmitSolutionTitleDto;
import com.code.data.entity.GptSolution;
import com.code.data.entity.Problem;
import com.code.data.entity.UserSubmitSolution;
import com.code.data.repository.GptSolutionRepository;
import com.code.data.repository.ProblemRepository;
import com.code.data.repository.UserSubmitProblemRepository;
import com.code.data.repository.UserSubmitSolutionRepository;
import com.code.exception.BaseException;
import com.code.util.builder.ProblemBuilderUtil;
import java.util.Optional;
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
  private final UserSubmitSolutionRepository userSubmitSolutionRepository;
  private final GptSolutionRepository gptSolutionRepository;
  // Util 정의
  private final ProblemBuilderUtil problemBuilderUtil;

  public ProblemResponseDto getProblem(long problemId) {
    logger.info("문제 조회");
    Problem problem = problemRepository.findById(problemId)
        .orElseThrow(() -> new BaseException(ErrorCode.RESOURCE_NOT_FOUND, "getProblem"));
    return problemBuilderUtil.problemToProblemResponseDto(problem);
  }

  // Todo : 아래 2개의 메소드 하나로 합치기

  /**
   * 푼 문제 조회
   * @param page
   * @param userSeq
   * @return
   */
  public Page<UserSubmitProblemDto> getUserSubmitProblemDtoPage(int page, long userSeq) {
    PageRequest pagable = PageRequest.of(page, 10, Sort.by(Direction.DESC, "userSubmitProblemUpdatedAt"));
    Page<UserSubmitProblemDto> userSubmitProblemDtoPage = userSubmitProblemRepository.findUserSubmitProblemDtoByUserSeq(userSeq, pagable);
    return userSubmitProblemDtoPage;
  }

  /**
   * 푼 문제 검색어로 조회
   * @param page
   * @param userSeq
   * @param direction
   * @param category
   * @return
   */
  public Page<UserSubmitProblemDto> getUserSubmitProblemDtoFilterConditionPage(int page, long userSeq, Direction direction, String category) {
    PageRequest pagable = PageRequest.of(page, 10, Sort.by(direction, category));
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
        .orElseThrow(() -> new BaseException(ErrorCode.RESOURCE_NOT_FOUND, "getUserSubmitSolutionDetailDto"));
    return userSubmissionSolutionDetailDto;
  }

  /**
   * 중복 제출 검사
   * @param submissionId
   */
  public void checkExistUserSubmitSolution(long submissionId) {
    Optional<UserSubmitSolution> optionalUserSubmitSolution = userSubmitSolutionRepository.findById(submissionId);
    if (optionalUserSubmitSolution.isPresent()) {
      throw new BaseException(ErrorCode.EXIST_RESOURCE_ERROR, "isExistUserSubmitSolution");
    }
  }

  // Todo : GPT Solution PK를 submssionId로 변경 또는 인덱스 걸기
  public CommonBooleanDto isExistGptSolution(long submissionId) {
    Optional<GptSolution> optionalGptSolution = gptSolutionRepository.findBySubmissionId(submissionId);
    return CommonBooleanDto.builder()
        .data(optionalGptSolution.isPresent())
        .build();
  }

}
