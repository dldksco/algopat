package com.user.domain;

import java.time.LocalDateTime;
import java.util.UUID;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="user_status", indexes = @Index(name = "user_seq", columnList = "user_seq DESC"))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class UserStatus{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_status_seq", updatable = false, nullable = false)
  private Long userStatusSeq;

  @Column(name="user_status_status")
  @Enumerated(EnumType.STRING)
  private UserStatusType userStatusStatus;
  @Column(name = "user_status_created_at")
  private LocalDateTime userStatusCreatedAt;


  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="user_seq")
  private User user;

  @PrePersist
  protected void onCreate() {
    userStatusCreatedAt = LocalDateTime.now();
  }
}
