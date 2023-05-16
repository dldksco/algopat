package com.user.repository;

import com.user.domain.User;
import com.user.domain.UserStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserStatusRepository extends JpaRepository<UserStatus, Long> {
Optional<UserStatus> findTopByUserUserSeqOrderByUserStatusCreatedAtDesc(Long userSeq);
}
