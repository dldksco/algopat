package com.code.controller;

import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.dto.RankPageDto;
import com.code.service.ProblemRankService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
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

//  /**
//   * 랭킹 조회
//   * @param level
//   * @param pagenumber
//   * @return
//   */
//  @GetMapping("/{level}")
//  public ResponseEntity<Page<ProblemRankOverviewDto[]>> getProblemRankOverviewDto(
//      @PathVariable("level") long level, @RequestParam(required = false, defaultValue = "0") int pagenumber) {
//    return ResponseEntity.ok(problemRankService.getProblemRankOverviews(level, pagenumber));
//  }

  @GetMapping("")
  public ResponseEntity<Page<ProblemRankOverviewDto[]>> getProblemRankOverviewDto(
      @RequestParam(required = false, value = "pagenumber", defaultValue = "0") int pagenumber,
      @RequestParam(required = false, value = "level") Long level,
      @RequestParam(required = false, value = "usercheck", defaultValue = "false") Boolean userCheck
      //, @RequestHeader(required = false, value = "userSeq"**) Long userSeq
  ) {
    Long userSeq = 7L;
    if (userCheck) {
      return ResponseEntity.ok(
          problemRankService.getProblemRankOverviewsByLevelAndUser(level, userSeq, pagenumber));
    } else {
      return ResponseEntity.ok(
          problemRankService.getProblemRankOverviewsByLevelAndUser(level, null, pagenumber));
    }
  }

    /**
   * 랭킹 검색어 필터링
   * @param problemId
   * @param pagenumber
   * @param languagefilter
   * @param sortcriteria
   * @param searchtext
   * @return
   */
  @GetMapping("/solutions/{problemId}")
  public ResponseEntity<Page<ProblemRankDetailDto[]>> findSolutionsByProblemIdWithDetailsAndFilters(
      @PathVariable long problemId,
      @RequestParam(required = false, defaultValue = "0") int pagenumber,
      @RequestParam(required = false) String languagefilter,
      @RequestParam(required = false) String sortcriteria,
      @RequestParam(required = false, defaultValue = "") String searchtext){

    Page<ProblemRankDetailDto[]> result = problemRankService.findSolutionsByProblemIdWithDetailsAndFilters(
        problemId, languagefilter, sortcriteria, searchtext, pagenumber);
    return ResponseEntity.ok(result);
  }

  /**
   * 특정 문제 제출 횟수 조회
   * @param problemId
   * @return
   */
  @GetMapping("/count/{problemId}")
  public ResponseEntity<Long> countSolutionsByProblemId(@PathVariable long problemId) {
    long result = problemRankService.countSolutionByProblemId(problemId);
    return ResponseEntity.ok(result);
  }

  /**
   * 특정 문제 마스터 조회
   * @param problemId
   * @return
   */
  @GetMapping("/master/{problemId}")
  public ResponseEntity<ProblemRankDetailDto> findMasterUserSolutionByProblemIdWithDetail(@PathVariable long problemId) {
    ProblemRankDetailDto masterUserProblemRankDetailDto = problemRankService.findMasterUserSolutionByProblemIdWithDetail(problemId);
    return ResponseEntity.ok(masterUserProblemRankDetailDto);
  }

  /**
   * 특정 문제 랭킹 상세 페이지 접근 시 필요한 데이터 조회
   * @param problemId
   * @return
   */
  @GetMapping("/pageinfo/{problemId}")
  public ResponseEntity<RankPageDto> findRankPageInfoByProblemId(@PathVariable long problemId) {
    RankPageDto rankPageDto = problemRankService.findRankPageInfoByProblemId(problemId);
    return ResponseEntity.ok(rankPageDto);
  }
}
