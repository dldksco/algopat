package com.code.controller;

import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.dto.ProblemRequestDto;
import com.code.data.dto.ProblemResponseDto;
import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.dto.UserSubmitSolutionTitleDto;
import com.code.service.KafkaProducerService;
import com.code.service.ProblemRankService;
import com.code.service.ProblemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/problem")
public class CodeController {

  private final String USER_CODE_TOPIC = "usercode";

  // Service 정의
  private final KafkaProducerService kafkaProducerService;
  private final ProblemService problemService;
  private final ProblemRankService problemRankService;

  /**
   * 유저 코드 제출 (Spring -> Kafka)
   * @param problemRequestDto
   * @return
   * @throws JsonProcessingException
   */
  @PostMapping("")
  public ResponseEntity<Void> sendProblemToKafka(@RequestBody @Valid ProblemRequestDto problemRequestDto)
      throws JsonProcessingException {
    kafkaProducerService.send(USER_CODE_TOPIC, problemRequestDto);
    return ResponseEntity.ok().build();
  }

  /**
   * 문제 조회
   * @param problemId
   * @return
   */
  @GetMapping("")
  public ResponseEntity<ProblemResponseDto> getProblem(@RequestParam @NotBlank Long problemId) {
    return ResponseEntity.ok(problemService.getProblem(problemId));
  }

  /**
   * 랭킹 조회
   * @param level
   * @param pageNumber
   * @return
   */
  @GetMapping("/rank/{level}/{pageNumber}")
  public ResponseEntity<Page<ProblemRankOverviewDto[]>> getProblemRankOverviewDto(
      @PathVariable("level") long level, @PathVariable("pageNumber") int pageNumber) {
    return ResponseEntity.ok(problemRankService.getProblemRankOverviews(level, pageNumber));
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
      @RequestParam(value = "userSeq", defaultValue = "9999") long userSeq) {
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
      @RequestParam(value = "userSeq", defaultValue = "9999") long userSeq) {
    return ResponseEntity.ok(
        problemService.getUserSubmitSolutionTitleDtoPage(pageNumber, userSeq, problemId));
  }

  /**
   * 제출 문제 상세 조회
   * @param submissionId
   * @param userSeq
   * @return
   */
  @GetMapping("/submission/solution/detail/{submissionId}")
  public ResponseEntity<?> getUserSubmissionSolutionDetailDto(
      @PathVariable("submissionId") long submissionId,
      @RequestParam(value = "userSeq", defaultValue = "9999") long userSeq) {
    return ResponseEntity.ok(problemService.getUserSubmitSolutionDetailDto(submissionId));
  }

  /**
   * 랭킹 검색어 필터링
   * @param problemId
   * @param pageNumber
   * @param languageFilter
   * @param sortCriteria
   * @param searchText
   * @return
   */
  @GetMapping("/rank/{problemId}/solutions/{pageNumber}")
  public ResponseEntity<Page<ProblemRankDetailDto[]>> findSolutionsByProblemIdWithDetailsAndFilters(
      @PathVariable long problemId,
      @PathVariable int pageNumber,
      @RequestParam(required = false) String languageFilter,
      @RequestParam(required = false) String sortCriteria,
      @RequestParam(required = false, defaultValue = "") String searchText){

    Page<ProblemRankDetailDto[]> result = problemRankService.findSolutionsByProblemIdWithDetailsAndFilters(
        problemId, languageFilter, sortCriteria, searchText, pageNumber);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/rank/{problemId}/count")
  public ResponseEntity<Long> countSolutionsByProblemId(@PathVariable long problemId) {
    long result = problemRankService.countSolutionByProblemId(problemId);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/rank/{problemId}/solutions/top")
  public ResponseEntity<ProblemRankDetailDto> findMasterUserSolutionByProblemIdWithDetail(@PathVariable long problemId) {
    ProblemRankDetailDto masterUserProblemRankDetailDto = problemRankService.findMasterUserSolutionByProblemIdWithDetail(problemId);
    return ResponseEntity.ok(masterUserProblemRankDetailDto);
  }
}
