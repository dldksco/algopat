package com.user.service;

import com.user.domain.ErrorCode;
import com.user.domain.User;
import com.user.domain.UserStatus;
import com.user.domain.UserStatusType;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.exception.BaseException;
import com.user.repository.UserRepository;
import com.user.repository.UserStatusRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserStatusRepository userStatusRepository;

    @Override
    @Transactional
    public boolean userCheck(GithubUserIdInfoDTO githubUserIdInfoDTO){
        String githubUserId = githubUserIdInfoDTO.getUserGithubId();
        String methodName= "userCheck";
        Optional<User> user = userRepository.findByUserGithubId(githubUserId);

        if(user.isPresent()){
            Long userSeq = user.get().getUserSeq();
            UserStatus userStatus = userStatusRepository.findTopByUserUserSeqOrderByCreatedAtDesc(userSeq).orElseThrow(() -> new BaseException(ErrorCode.SERVICE_SERVLET_ERROR,methodName));
            if(!userStatus.getUserStatusStatus().equals(UserStatusType.AVAILABLE))
                throw new BaseException(ErrorCode.UNVALID_USER,methodName);
//            throw new BaseException(ErrorCode.UNVALID_USER,methodName);
            return true;
        }
        else{
            User newUser = User.builder().userGithubId(githubUserIdInfoDTO.getUserGithubId()).build();
            UserStatus userStatus = UserStatus.builder().user(newUser).userStatusStatus(
                UserStatusType.AVAILABLE).build();
            newUser.getUserStatuses().add(userStatus);
            userRepository.save(newUser);
//            throw new BaseException(ErrorCode.UNVALID_USER,methodName);
            return false;
        }
    }
}
