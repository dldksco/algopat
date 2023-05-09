package com.user.repository;

import com.user.domain.UserImage;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserImageRespository extends JpaRepository<UserImage, Long> {

  @Query("SELECT u FROM UserImage u JOIN FETCH u.user us WHERE us.userSeq = :userSeq")
  Optional<UserImage> findByUserUserSeqWithFetchJoin(@Param("userSeq") Long userSeq);
}
