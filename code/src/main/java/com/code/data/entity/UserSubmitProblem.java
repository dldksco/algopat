//package com.code.data.entity;
//
//import com.code.data.domain.BaseEntityTime;
//import javax.persistence.AttributeOverride;
//import javax.persistence.AttributeOverrides;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@Getter
//@Setter
//@Table(name = "user_submit_problem")
//@AttributeOverrides({
//    @AttributeOverride(name = "createdAt", column = @Column(name = "user_submit_create_at", nullable = false, updatable = false)),
//    @AttributeOverride(name = "updatedAt", column = @Column(name = "user_submit_problem_updated_at", nullable = false))
//})
//public class UserSubmitProblem extends BaseEntityTime {
//  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  @Column(name = "problem_id")
//  private long problemId;
//
//  @Column(name = "user_seq")
//  private long userSeq;
//}
