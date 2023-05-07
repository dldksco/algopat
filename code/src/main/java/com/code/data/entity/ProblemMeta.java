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
@Table(name = "problem_meta")
public class ProblemMeta {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "problem_id")
  private long problemId;

  @Column(name = "problem_title")
  private String problemTitle;

  @Column(name = "problem_submitted_count")
  private long problemSubmittedCount;

  @Column(name = "problem_master_user_seq")
  private long problemMasterUserSeq;

}
