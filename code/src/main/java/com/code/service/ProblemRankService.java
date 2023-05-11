package com.code.service;

import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.dto.ProblemSimpInfoDto;
import com.code.data.dto.RankPageDto;
import com.code.data.repository.ProblemRepository;
import com.code.data.repository.RankRepository;
import com.code.util.builder.RankBuilderUtil;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProblemRankService {

  private static final Logger logger = LoggerFactory.getLogger(ProblemRankService.class);

  private final ProblemRepository problemRepository;

  private final RankBuilderUtil rankBuilderUtil;

  private final RankRepository rankRepository;

  public Page<ProblemRankOverviewDto[]> getProblemRankOverviews(long problemLevel,
      int pageNumber) {
    logger.info("랭킹 데이터 조회");
    Page<ProblemRankOverviewDto[]> problemRankOverviewDtos = problemRepository.findProblemsByLevelWithDetails(
            problemLevel,
            PageRequest.of(pageNumber, 10, Sort.Direction.DESC, "pm.problemSubmittedCount"))
        .orElseThrow(RuntimeException::new);
    return problemRankOverviewDtos;
  }

  public Page<ProblemRankDetailDto[]> findSolutionsByProblemIdWithDetailsAndFilters(long problemId,
      String languageFilter, String sortCriteria, String searchText, int pageNumber) {
    return rankRepository.findSolutionsByProblemIdWithDetailsAndFilters(problemId, languageFilter,
            sortCriteria, searchText, PageRequest.of(pageNumber, 10))
        .orElseThrow(() -> new RuntimeException("Problem not found"));
  }

  public Long countSolutionByProblemId(long problemId) {
    return rankRepository.countSolutionsByProblemId(problemId);
  }

  public ProblemRankDetailDto findMasterUserSolutionByProblemIdWithDetail(long problemId) {
    List<ProblemRankDetailDto> problemRankDetailDtoList = rankRepository.findTopSolutionByProblemId(
            problemId, PageRequest.of(0, 1))
        .orElseThrow(() -> new RuntimeException("Problem not found"));

    return problemRankDetailDtoList.get(0);
  }

  public RankPageDto findRankPageInfoByProblemId(long problemId) {
    ProblemSimpInfoDto problemSimpInfoDto = rankRepository.findProblemSimpInfoByProblemId(problemId)
        .orElseThrow(() -> new RuntimeException("Problem not found"));
    Long count = rankRepository.countSolutionsByProblemId(problemId);
    Optional<List<ProblemRankDetailDto>> masterUserSoultionOptional = rankRepository.findTopSolutionByProblemId(
        problemId, PageRequest.of(0, 1));
    ProblemRankDetailDto masterUserSolution = null;
    if (masterUserSoultionOptional.isPresent()) {
      masterUserSolution = masterUserSoultionOptional.get().get(0);
    }
    RankPageDto rankPageDto = rankBuilderUtil.rankPageDtoBuilder(problemSimpInfoDto, masterUserSolution, count);
    return rankPageDto;
  }

  public List<Long> findProblemIdsByUserSeq(long userSeq) {
    List<Long> problemIdList = rankRepository.findProblemIdsByUserSeq(userSeq).orElseThrow(() -> new RuntimeException("Problem not found"));
    return problemIdList;
  }
}
