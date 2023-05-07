package com.code.data.repository;

import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.entity.Problem;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

  @Query("SELECT new com.code.data.dto.ProblemRankOverviewDto(p.problemId, p.problemTitle, p.problemLevel, pm.problemSubmittedCount, unn.userNickname) " +
  "FROM Problem p " +
  "JOIN ProblemMeta pm ON p.problemId = pm.problemId " +
  "JOIN UserNickname unn ON pm.problemMasterUserSeq = unn.userSeq " +
  "WHERE p.problemLevel = :level ")
  Optional<Page<ProblemRankOverviewDto[]>> findProblemsByLevelWithDetails(long level, Pageable pageable);
}
