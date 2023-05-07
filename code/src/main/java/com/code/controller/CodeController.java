package com.code.controller;

import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.dto.ProblemRequestDto;
import com.code.data.dto.ProblemResponseDto;
import com.code.service.KafkaProducerService;
import com.code.service.ProblemRankService;
import com.code.service.ProblemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/problem")
public class CodeController {

  private final String USER_CODE_TOPIC = "usercode";

  // Service 정의
  private final KafkaProducerService kafkaProducerService;
  private final ProblemService problemService;
  private final ProblemRankService problemRankService;

  @PostMapping("")
  public ResponseEntity<Void> sendProblemToKafka(@RequestBody ProblemRequestDto problemRequestDto)
      throws JsonProcessingException {
    kafkaProducerService.send(USER_CODE_TOPIC, problemRequestDto);
    return ResponseEntity.ok().build();
  }

  @GetMapping("")
  public ResponseEntity<ProblemResponseDto> getProblem(@RequestParam long problemId) {
    return ResponseEntity.ok(problemService.getProblem(problemId));
  }

  @GetMapping("/rank/{level}/{pageNumber}")
  public ResponseEntity<Page<ProblemRankOverviewDto[]>> getProblemRankOverviewDto(
      @PathVariable("level") long level, @PathVariable("pageNumber") int pageNumber) {
    return ResponseEntity.ok(problemRankService.getProblemRankOverviews(level, pageNumber));
  }

  @GetMapping("/submission")
  public ResponseEntity<Long> getUserSubmitProblem() {

    return ResponseEntity.ok(problemService.getUserSubmitProblem(1));
  }

}
