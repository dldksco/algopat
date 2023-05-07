package com.code.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "gpt_solution")
public class GptSolution {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "gpt_solution_seq")
  private long gptSolutionSeq;

  @Column(name = "submission_id")
  private long submissionId;

  @Column(name = "user_seq")
  private long userSeq;

  // Time
  @Column(name = "gpt_solution_time_complexity")
  private String gptSolutionTimeComplexity;

  @Column(name = "gpt_solution_time_complexity_reason")
  private String gptSolutionTimeComplexityReason;

  @Column(name = "gpt_solution_time_score")
  private long gptSolutionTimeScore;

  @Column(name = "gpt_solution_time_complexity_good_point")
  private String gptSolutionTimeComplexityGoodPoint;

  @Column(name = "gpt_solution_time_complexity_bad_point")
  private String gptSolutionTimeComplexityBadPoint;

  @Column(name = "gpt_improving_time_complexity_suggestion")
  private String gptImprovingTimeComplexitySuggestion;

  // Space
  @Column(name = "gpt_solution_space_complexity")
  private String gptSolutionSpaceComplexity;

  @Column(name = "gpt_solution_space_complexity_reason")
  private String gptSolutionSpaceComplexityReason;

  @Column(name = "gpt_solution_space_score")
  private long gptSolutionSpaceScore;

  @Column(name = "gpt_solution_space_complexity_good_point")
  private String gptSolutionSpaceComplexityGoodPoint;

  @Column(name = "gpt_solution_space_complexity_bad_point")
  private String gptSolutionSpaceComplexityBadPoint;

  @Column(name = "gpt_improving_space_complexity_suggestion")
  private String gptImprovingSpaceComplexitySuggestion;

  @Column(name = "gpt_solution_clean_score")
  private long gptSolutionCleanScore;

  @Column(name = "gpt_solution_refactoring_suggestion")
  private String gptSolutionRefactoringSuggestion;

  @Column(name = "gpt_total_score")
  private long gptTotalScore;
}
