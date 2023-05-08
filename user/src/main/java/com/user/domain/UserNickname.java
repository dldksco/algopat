package com.user.domain;

import java.time.LocalDate;
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
import lombok.Setter;

@Entity
@Table(name = "user_nickname")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserNickname {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_nickname_seq", nullable = false)
  private Long userNicknameSeq;

  @Column(name = "user_seq", nullable = false)
  private Long userSeq;

  @Column(name = "user_nickname")
  private String userNickname;

  @Column(name = "user_nickname_created_at")
  private LocalDate userNicknameCreatedAt;
}
