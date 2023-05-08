package com.user.repository;

import com.user.domain.UserNickname;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserNicknameRespository extends JpaRepository<UserNickname, Long> {

  Optional<UserNickname> findByUserUserSeq(Long userSeq);
}
