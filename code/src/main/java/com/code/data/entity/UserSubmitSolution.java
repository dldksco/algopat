package com.code.data.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_submit_solution")
public class UserSubmitSolution {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "submission_id")
  private long submissionId;

  @Column(name = "problem_id")
  private long problemId;

  @Column(name = "user_seq")
  private long userSeq;

  @Column(name = "user_submit_solution_time")
  private LocalDateTime userSubmitSolutionTime;

  @Column(name = "user_submit_solution_result")
  private String userSubmitSolutionResult;

  @Column(name = "user_submit_solution_result_category")
  private String userSubmitSolutionResultCategory;

  @Column(name = "user_submit_solution_language")
  private String userSubmitSolutionLanguage;

  @Column(name = "user_submit_solution_code")
  private String userSubmitSolutionCode;

  @Column(name = "user_submit_solution_runtime")
  private long userSubmitSolutionRuntime;

  @Column(name = "user_submit_solution_memory")
  private long userSubmitSolutionMemory;

  @Column(name = "user_submit_problem_seq")
  private long userSubmitProblemSeq;
}