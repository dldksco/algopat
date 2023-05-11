package com.user.domain;

import java.util.UUID;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

@Entity
@Table(name="user_status", indexes = @Index(name = "user_seq", columnList = "user_seq DESC"))
@AttributeOverride(name="createdAt", column=@Column(name="user_status_created_at", nullable = false, updatable = false))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserStatus extends BaseEntityTime{
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(
      name = "UUID",
      strategy = "org.hibernate.id.UUIDGenerator"
  )
  @Column(name = "user_status_seq", updatable = false, nullable = false)
  @Type(type= "uuid-char")
  private UUID userStatusSeq;

  @Column(name="user_status_status")
  @Enumerated(EnumType.STRING)
  private UserStatusType userStatusStatus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="user_seq")
  private User user;

}
