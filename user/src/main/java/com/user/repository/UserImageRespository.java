package com.user.repository;

import com.user.domain.UserImage;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRespository extends JpaRepository<UserImage, Long> {

  Optional<UserImage> findByUserUserSeq(Long userSeq);
}
