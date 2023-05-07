package com.code.data.repository;

import com.code.data.dto.ProblemRankOverviewDto;
import com.code.data.dto.UserSubmitProblemDto;
import com.code.data.dto.UserSubmitSolutionTitleDto;
import com.code.data.entity.UserSubmitProblem;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserSubmitProblemRepository extends JpaRepository<UserSubmitProblem, Long> {

  //Page<UserSubmitProblem> findAll(Pageable pageable);

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
}

