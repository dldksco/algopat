package com.user.repository;

import com.user.domain.UserImage;
import com.user.domain.UserStatus;
import com.user.domain.UserSubmitCount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserSubmitCountRepostiory extends JpaRepository<UserSubmitCount, Long> {
  @Query("SELECT u FROM UserSubmitCount u JOIN FETCH u.user us WHERE us.userSeq = :userSeq")
  Optional<UserSubmitCount> findByUserUserSeqWithFetchJoin(@Param("userSeq") Long userSeq);


}
