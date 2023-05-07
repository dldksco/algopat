package com.code.service;

import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.repository.ProblemRepository;
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

  public Page<ProblemRankOverviewDto[]> getProblemRankOverviews(long problemLevel,
      int pageNumber) {
    logger.info("랭킹 데이터 조회");
    Page<ProblemRankOverviewDto[]> problemRankOverviewDtos = problemRepository.findProblemsByLevelWithDetails(
        problemLevel,
        PageRequest.of(pageNumber, 10, Sort.Direction.DESC, "pm.problemSubmittedCount")).orElseThrow(RuntimeException::new);
    return problemRankOverviewDtos;
  }
}
