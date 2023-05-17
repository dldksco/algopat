package com.code.data.repository;

import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.entity.Problem;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

  @Query(
      "SELECT new com.code.data.dto.ProblemRankOverviewDto(p.problemId, p.problemTitle, p.problemLevel, pm.problemSubmittedCount, u.userGithubId) "
          +
          "FROM Problem p " +
          "JOIN ProblemMeta pm ON p.problemId = pm.problemId " +
          "JOIN User u ON pm.problemMasterUserSeq = u.userSeq " +
          "WHERE p.problemLevel = :level ")
  Optional<Page<ProblemRankOverviewDto[]>> findProblemsByLevelWithDetails(long level,
      Pageable pageable);

  /**
   * 문제 랭킹 조회 (전체 + 조건검색)
   * @param level
   * @param userSeq
   * @param pageable
   * @return
   */
  @Query(
      "SELECT new com.code.data.dto.ProblemRankOverviewDto(p.problemId, p.problemTitle, p.problemLevel, pm.problemSubmittedCount, u.userGithubId) "
          +
          "FROM Problem p " +
          "JOIN ProblemMeta pm ON p.problemId = pm.problemId " +
          "JOIN User u ON pm.problemMasterUserSeq = u.userSeq " +
          "JOIN UserSubmitProblem usp ON p.problemId = usp.problemId " +
          "WHERE (:level IS NULL OR p.problemLevel = :level) " +
          "AND (:userSeq IS NULL OR usp.userSeq = :userSeq) " +
          "GROUP BY p.problemId")
  Optional<Page<ProblemRankOverviewDto[]>> findProblemsByLevelAndUserWithDetails(
      @Param("level") Long level, @Param("userSeq") Long userSeq, Pageable pageable);
}
