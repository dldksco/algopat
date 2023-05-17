package com.code.data.repository;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.entity.UserSubmitSolution;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserSubmitSolutionRepository extends JpaRepository<UserSubmitSolution, Long> {
  @Query("SELECT new com.code.data.dto.DateGrassCountDTO(CAST(FUNCTION('DATE', uss.userSubmitSolutionTime) AS LocalDate), COUNT(uss.userSubmitSolutionTime)) " +
      "FROM UserSubmitSolution uss " +
      "WHERE uss.userSeq = :userSeq " +
      "AND uss.userSubmitSolutionTime BETWEEN :todayMinusYear AND :today " +
      "GROUP BY FUNCTION('DATE', uss.userSubmitSolutionTime)")
  List<DateGrassCountDTO> findDateGrossCountByUserSeq(@Param("userSeq") Long userSeq, @Param("today") LocalDateTime today, @Param("todayMinusYear") LocalDateTime todayMinusYear);
}
