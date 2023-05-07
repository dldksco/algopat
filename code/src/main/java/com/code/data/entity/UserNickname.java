package com.code.data.entity;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

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