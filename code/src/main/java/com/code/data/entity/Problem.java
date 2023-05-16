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
@Table(name = "problem")
public class Problem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "problem_id")
  private long problemId;

  @Column(name = "problem_title")
  private String problemTitle;

  @Column(name = "problem_level")
  private long problemLevel;

  @Column(name = "problem_desc")
  private String problemDesc;

  @Column(name = "problem_input")
  private String problemInput;

  @Column(name = "problem_output")
  private String problemOutput;

  @Column(name = "problem_tag")
  private String problemTag;

  @Column(name = "problem_limit")
  private String problemLimit;

  @Column(name = "problem_time_limit")
  private long problemTimeLimit;

  @Column(name = "problem_space_limit")
  private long problemSpaceLimit;
}
