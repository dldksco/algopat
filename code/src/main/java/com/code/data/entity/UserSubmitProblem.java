package com.code.data.entity;

import com.code.data.domain.BaseEntityTime;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "user_submit_problem")
public class UserSubmitProblem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_submit_problem_seq")
  private long userSubmitProblemSeq;

  @Column(name = "problem_id")
  private long problemId;

  @Column(name = "user_seq")
  private long userSeq;

  @Column
  private LocalDateTime userSubmitProblemCreatedAt;

  @Column
  private LocalDateTime userSubmitProblemUpdatedAt;

}
