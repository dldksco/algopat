package com.code.data.repository;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.dto.UserSubmissionSolutionDetailDto;
import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.dto.UserSubmitSolutionTitleDto;
import com.code.data.entity.UserSubmitProblem;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserSubmitProblemRepository extends JpaRepository<UserSubmitProblem, Long> {

  @Query("SELECT new com.code.data.dto.UserSubmitProblemDto(usp.problemId, p.problemTitle, p.problemLevel) " +
      "FROM UserSubmitProblem usp " +
      "JOIN Problem p ON p.problemId = usp.problemId " +
      "WHERE usp.userSeq = :userSeq")
  Page<UserSubmitProblemDto> findUserSubmitProblemDtoByUserSeq(long userSeq, Pageable pageable);

  @Query("SELECT new com.code.data.dto.UserSubmitSolutionTitleDto(uss.submissionId, uss.userSubmitSolutionTime) " +
      "FROM UserSubmitSolution uss " +
      "JOIN UserSubmitProblem usp ON uss.problemId = usp.problemId " +
      "WHERE uss.userSeq = :userSeq and usp.problemId = :problemId"
  )
  Page<UserSubmitSolutionTitleDto> findUserSubmitSolutionTitleByUserSeq(long userSeq, long problemId, Pageable pageable);

  @Query("SELECT new com.code.data.dto.UserSubmissionSolutionDetailDto(uss.userSubmitSolutionResult, "
      + "uss.userSubmitSolutionResultCategory, "
      + "uss.userSubmitSolutionLanguage, "
      + "uss.userSubmitSolutionCode, "
      + "uss.userSubmitSolutionRuntime, "
      + "uss.userSubmitSolutionMemory, "
      + "gs.gptSolutionTimeComplexity, "
      + "gs.gptSolutionTimeComplexityReason, "
      + "gs.gptSolutionTimeScore, "
      + "gs.gptSolutionTimeComplexityGoodPoint, "
      + "gs.gptSolutionTimeComplexityBadPoint, "
      + "gs.gptImprovingTimeComplexitySuggestion, "
      + "gs.gptSolutionSpaceComplexity, "
      + "gs.gptSolutionSpaceComplexityReason, "
      + "gs.gptSolutionSpaceScore, "
      + "gs.gptSolutionSpaceComplexityGoodPoint, "
      + "gs.gptSolutionSpaceComplexityBadPoint, "
      + "gs.gptImprovingSpaceComplexitySuggestion, "
      + "gs.gptSolutionCleanScore, "
      + "gs.gptSolutionRefactoringSuggestion, "
      + "gs.gptTotalScore) " +
      "FROM UserSubmitSolution uss " +
      "JOIN GptSolution gs ON uss.submissionId = gs.submissionId " +
      "WHERE uss.submissionId = :submissionId")
  Optional<UserSubmissionSolutionDetailDto> findUserSubmitSolutionDetailBySubmissionId(long submissionId);
  @Query("SELECT new com.code.data.dto.DateGrassCountDTO(CAST(FUNCTION('DATE', usp.userSubmitProblemCreatedAt) AS LocalDate), COUNT(usp.userSubmitProblemCreatedAt)) " +
      "FROM UserSubmitProblem usp " +
      "WHERE usp.userSeq = :userSeq " +
      "AND usp.userSubmitProblemCreatedAt BETWEEN :todayMinusYear AND :today " +
      "GROUP BY FUNCTION('DATE', usp.userSubmitProblemCreatedAt)")
  List<DateGrassCountDTO> findDateGrossCountByUserSeq(@Param("userSeq") Long userSeq, @Param("today") LocalDateTime today, @Param("todayMinusYear") LocalDateTime todayMinusYear);

}

