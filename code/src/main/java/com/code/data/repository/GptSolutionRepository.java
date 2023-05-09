package com.code.data.repository;

import com.code.data.entity.GptSolution;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GptSolutionRepository extends JpaRepository<GptSolution, Long> {

  Optional<GptSolution> findBySubmissionId(long submissionId);
}
