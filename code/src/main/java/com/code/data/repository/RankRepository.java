package com.code.data.repository;

import com.code.data.dto.ProblemRankDetailDto;
import com.code.data.dto.ProblemSimpInfoDto;
import com.code.data.entity.Problem;
import com.code.data.entity.ProblemMeta;
import com.code.data.entity.UserSubmitSolution;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RankRepository extends JpaRepository<Problem, Long> {

//  @Query("SELECT new com.code.data.dto.ProblemRankDetailDto("
//      + "gs.gptSolutionSeq, "
//      + "unn.userNickname, "
//      + "uss.userSubmitSolutionLanguage, "
//      + "uss.userSubmitSolutionRuntime, "
//      + "uss.userSubmitSolutionMemory, "
//      + "uss.userSubmitSolutionCodeLength, "
//      + "gs.gptTotalScore, "
//      + "uss.userSubmitSolutionTime) "
//      + "FROM UserSubmitSolution uss "
//      + "JOIN GptSolution gs ON uss.submissionId = gs.submissionId "
//      + "JOIN UserNickname unn ON uss.userSeq = unn.userSeq "
//      + "WHERE uss.problemId = :problemId")
//  Optional<Page<ProblemRankDetailDto[]>> findSolutionsByProblemIdWithDetails(long problemId,
//      Pageable pageable);

  @Query("SELECT COUNT(uss) "
      + "FROM UserSubmitSolution uss "
      + "WHERE uss.problemId = :problemId")
  Long countSolutionsByProblemId(long problemId);

  @Query("SELECT new com.code.data.dto.ProblemRankDetailDto("
      + "gs.gptSolutionSeq, "
      + "u.userGithubId, "
      + "uss.userSubmitSolutionLanguage, "
      + "uss.userSubmitSolutionRuntime, "
      + "uss.userSubmitSolutionMemory, "
      + "uss.userSubmitSolutionCodeLength, "
      + "gs.gptTotalScore, "
      + "uss.userSubmitSolutionTime) "
      + "FROM UserSubmitSolution uss "
      + "JOIN GptSolution gs ON uss.submissionId = gs.submissionId "
      + "JOIN User u ON uss.userSeq = u.userSeq "
      + "WHERE uss.problemId = :problemId "
      + "AND (:languageFilter IS NULL OR uss.userSubmitSolutionLanguage = :languageFilter) "
      + "AND u.userGithubId LIKE CONCAT('%', :searchText, '%') "
      + "ORDER BY "
      + "CASE WHEN :sortCriteria = 'runtime' THEN uss.userSubmitSolutionRuntime END ASC, "
      + "CASE WHEN :sortCriteria = 'memory' THEN uss.userSubmitSolutionMemory END ASC, "
      + "CASE WHEN :sortCriteria = 'score' THEN gs.gptTotalScore END DESC, "
      + "CASE WHEN :sortCriteria = 'codeLength' THEN uss.userSubmitSolutionCodeLength END ASC, "
      + "uss.userSubmitSolutionTime ASC")
  Optional<Page<ProblemRankDetailDto[]>> findSolutionsByProblemIdWithDetailsAndFilters(
      long problemId,
      @Param("languageFilter") String languageFilter,
      @Param("sortCriteria") String sortCriteria,
      @Param("searchText") String searchText,
      Pageable pageable);

  @Query("SELECT new com.code.data.dto.ProblemRankDetailDto("
      + "gs.gptSolutionSeq, "
      + "u.userGithubId, "
      + "uss.userSubmitSolutionLanguage, "
      + "uss.userSubmitSolutionRuntime, "
      + "uss.userSubmitSolutionMemory, "
      + "uss.userSubmitSolutionCodeLength, "
      + "gs.gptTotalScore, "
      + "uss.userSubmitSolutionTime) "
      + "FROM UserSubmitSolution uss "
      + "JOIN GptSolution gs ON uss.submissionId = gs.submissionId "
      + "JOIN User u ON uss.userSeq = u.userSeq "
      + "WHERE uss.problemId = :problemId "
      + "ORDER BY gs.gptTotalScore DESC, "
      + "uss.userSubmitSolutionRuntime ASC, "
      + "uss.userSubmitSolutionTime ASC")
  Optional<List<ProblemRankDetailDto>> findTopSolutionByProblemId(long problemId,
      Pageable pageable);

  @Query("SELECT new com.code.data.dto.ProblemSimpInfoDto("
      + "p.problemLevel,"
      + "p.problemTitle) "
      + "FROM Problem p "
      + "WHERE p.problemId = :problemId ")
  Optional<ProblemSimpInfoDto> findProblemSimpInfoByProblemId(long problemId);

}
