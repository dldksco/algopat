package com.user.domain;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name ="user_image", indexes = @Index(name = "user_seq", columnList = "user_seq"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@AttributeOverride(name="createdAt", column=@Column(name="user_image_created_at", nullable = false, updatable = false))
@AttributeOverride(name = "updatedAt", column = @Column(name = "user_image_updated_at"))
@EntityListeners(AuditingEntityListener.class)
public class UserImage extends BaseEntityTime {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_image_seq", nullable = false)
  private Long userNicknameSeq;
  @OneToOne
  @JoinColumn(name = "user_seq")
  private User user;

  @Column(name = "user_image_url")
  private String userImageUrl;

}
