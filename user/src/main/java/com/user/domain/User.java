package com.user.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

@Entity
@Table(name ="user", indexes = @Index(name = "user_github_id", columnList = "user_github_id"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
  @Id
  @GeneratedValue(generator = "GenerationType.IDENTITY")
  @Column(name = "user_seq", updatable = false, nullable = false)
  private Long userSeq;

  @Column(name="user_github_id", nullable = false)
  private String userGithubId;

  @Column(name = "user_created_at")
  private LocalDateTime userCreatedAt;

  @Column(name="user_backjoon_id")
  @Builder.Default
  private String userBackjoonId="NO_SUBMITTED";
  @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
  @Builder.Default
  private List<UserStatus> userStatuses = new ArrayList<>();

  @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  private UserImage userImage;


  @PrePersist
  protected void onCreate() {
    userCreatedAt = LocalDateTime.now();
  }
}
