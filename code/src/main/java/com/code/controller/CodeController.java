package com.code.controller;

import com.code.data.dto.CommonBooleanDto;
import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.dto.ProblemRequestDto;
import com.code.data.dto.ProblemResponseDto;
import com.code.data.dto.UserServiceBackjoonRequestDto;
import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.dto.UserSubmitSolutionTitleDto;
import com.code.data.dto.UserSubmittedProblemIdListDto;
import com.code.service.KafkaProducerService;
import com.code.service.ProblemRankService;
import com.code.service.ProblemService;
import com.code.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/problem")
public class CodeController {

  // logger 정의
  private static final Logger logger = LoggerFactory.getLogger(CodeController.class);

  private final String USER_CODE_TOPIC = "usercode";

  // Service 정의
  private final KafkaProducerService kafkaProducerService;
  private final ProblemService problemService;
  private final ProblemRankService problemRankService;
  private final UserService userService;

  /**
   * 유저 코드 제출 (Spring -> Kafka)
   * @param problemRequestDto
   * @return
   * @throws JsonProcessingException
   */
  @PostMapping("")
  public ResponseEntity<Void> sendProblemToKafka(@RequestBody @Valid ProblemRequestDto problemRequestDto,
      @RequestHeader("userSeq") long userSeq)
      throws JsonProcessingException {
    problemService.checkExistUserSubmitSolution(Long.parseLong(problemRequestDto.getSubmissionId())); // 이미 제출한 코드가 있는지 체크 (있다면 409)
    problemRequestDto.setUserSeq(userSeq);
    kafkaProducerService.send(USER_CODE_TOPIC, problemRequestDto);

    userService.checkBackjoonId(
        UserServiceBackjoonRequestDto.builder()
            .userSeq(userSeq)
            .userName(problemRequestDto.getUsername())
            .build());
    return ResponseEntity.ok().build();
  }

  /**
   * 문제 조회
   * @param problemId
   * @return
   */
  @GetMapping("")
  public ResponseEntity<ProblemResponseDto> getProblem(@RequestParam long problemId) {
    return ResponseEntity.ok(problemService.getProblem(problemId));
  }


  /**
   * 푼 문제 목록 조회
   * @param pageNumber
   * @param userSeq
   * @return
   */
  @GetMapping("/submission/{pageNumber}")
  public ResponseEntity<Page<UserSubmitProblemDto>> getUserSubmitProblemDto(
      @PathVariable("pageNumber") int pageNumber,
      @RequestHeader(value = "userSeq", defaultValue = "-1") long userSeq
      ) {
    logger.info("헤더에서 userSeq 꺼냄 : {}", userSeq);
    return ResponseEntity.ok(problemService.getUserSubmitProblemDtoPage(pageNumber, userSeq));
  }

  /**
   * 푼 문제 -> 제출 목록 조회
   * @param pageNumber
   * @param problemId
   * @param userSeq
   * @return
   */
  @GetMapping("/submission/solution/{problemId}/{pageNumber}")
  public ResponseEntity<Page<UserSubmitSolutionTitleDto>> getUserSubmitSolutionTitleDto(
      @PathVariable("pageNumber") int pageNumber,
      @PathVariable("problemId") long problemId,
      @RequestHeader("userSeq") long userSeq) {
    logger.info("헤더에서 userSeq 꺼냄 : {}", userSeq);
    return ResponseEntity.ok(
        problemService.getUserSubmitSolutionTitleDtoPage(pageNumber, userSeq, problemId));
  }

  /**
   * 제출 문제 상세 조회
   * @param submissionId
   * @return
   */
  @GetMapping("/submission/solution/detail/{submissionId}")
  public ResponseEntity<?> getUserSubmissionSolutionDetailDto(
      @PathVariable("submissionId") long submissionId) {
    return ResponseEntity.ok(problemService.getUserSubmitSolutionDetailDto(submissionId));
  }

  /**
   * GPT 응답 존재 여부
   * false : GPT 응답 생성중
   * true  : GPT 응답 생성 완료
   * @param submissionId
   * @return
   */
  @GetMapping("/submission/solution/exist/{submissionId}")
  public ResponseEntity<CommonBooleanDto> isExistGptSolution(
      @PathVariable("submissionId") long submissionId
  ) {
    return ResponseEntity.ok(problemService.isExistGptSolution(submissionId));
  }

  @GetMapping("/submission/list")
  public ResponseEntity<UserSubmittedProblemIdListDto> getUserSubmissionProblemSeqList(
      @RequestHeader("userSeq") long userSeq) {
    return ResponseEntity.ok(problemRankService.findProblemIdsByUserSeq(userSeq));
  }

  /**
   * 회원 푼 문제 정렬 조회
   * @param pageNumber
   * @param category
   * @param condition
   * @return
   */
  @GetMapping("/submission/sort/{pageNumber}")
  public ResponseEntity<?> getUserSubmitProblemDtoOrderByCondition(
      @PathVariable(value = "pageNumber") int pageNumber,
      @RequestParam(value = "category", defaultValue = "date") String category,
      @RequestParam(value = "condition", defaultValue = "desc") String condition,
      @RequestHeader(value = "userSeq") long userSeq
  ) {

    Direction direction = "ASC".equalsIgnoreCase(condition) ? Direction.ASC : Direction.DESC;
    if (category.equalsIgnoreCase("date")) {
      category = "userSubmitProblemUpdatedAt";
    } else if (category.equalsIgnoreCase("id")) {
      category = "problemId";
    } else if (category.equalsIgnoreCase("level")) {
      category = "p.problemLevel";
    }

    return ResponseEntity.ok(problemService.getUserSubmitProblemDtoFilterConditionPage(pageNumber, userSeq, direction, category));
  }

}
