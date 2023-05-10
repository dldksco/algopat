package com.code.controller;

import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemRankOverviewDto;
import com.code.service.ProblemRankService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/rank")
public class RankController {

  private static final Logger logger = LoggerFactory.getLogger(RankController.class);

  private final ProblemRankService problemRankService;

  /**
   * 랭킹 조회
   * @param level
   * @param pageNumber
   * @return
   */
  @GetMapping("/{level}/{pageNumber}")
  public ResponseEntity<Page<ProblemRankOverviewDto[]>> getProblemRankOverviewDto(
      @PathVariable("level") long level, @PathVariable("pageNumber") int pageNumber) {
    return ResponseEntity.ok(problemRankService.getProblemRankOverviews(level, pageNumber));
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
  @GetMapping("/solutions/{problemId}/{pageNumber}")
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

  @GetMapping("/count/{problemId}")
  public ResponseEntity<Long> countSolutionsByProblemId(@PathVariable long problemId) {
    long result = problemRankService.countSolutionByProblemId(problemId);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/master/{problemId}")
  public ResponseEntity<ProblemRankDetailDto> findMasterUserSolutionByProblemIdWithDetail(@PathVariable long problemId) {
    ProblemRankDetailDto masterUserProblemRankDetailDto = problemRankService.findMasterUserSolutionByProblemIdWithDetail(problemId);
    return ResponseEntity.ok(masterUserProblemRankDetailDto);
  }

}
