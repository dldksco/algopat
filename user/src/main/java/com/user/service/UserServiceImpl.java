package com.user.service;

import com.user.domain.ErrorCode;
import com.user.domain.User;
import com.user.domain.UserImage;
import com.user.domain.UserNickname;
import com.user.domain.UserStatus;
import com.user.domain.UserStatusType;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.exception.BaseException;
import com.user.repository.UserImageRespository;
import com.user.repository.UserNicknameRespository;
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
    private final UserImageRespository userImageRespository;

    private final UserNicknameRespository userNicknameRespository;

    @Override
    @Transactional
    public boolean userCheck(GithubUserIdInfoDTO githubUserIdInfoDTO){
        String githubUserId = githubUserIdInfoDTO.getUserGithubId();
        String githubUserImageUrl = githubUserIdInfoDTO.getUserImageUrl();
        String githubUserNickname = githubUserIdInfoDTO.getUserNickname();
        Optional<User> user = userRepository.findByUserGithubId(githubUserId);

        if(user.isPresent()){
            Long userSeq = user.get().getUserSeq();
            UserStatus userStatus = userStatusRepository.findTopByUserUserSeqOrderByUserStatusCreatedAtDesc(userSeq).orElseThrow(() -> new BaseException(ErrorCode.SERVICE_SERVLET_ERROR));
            if(!userStatus.getUserStatusStatus().equals(UserStatusType.AVAILABLE))
                throw new BaseException(ErrorCode.UNVALID_USER);

            UserImage  userImage = userImageRespository.findByUserUserSeq(userSeq).orElseThrow(() -> new BaseException(ErrorCode.SERVICE_SERVLET_ERROR));
            UserNickname userNickname = userNicknameRespository.findByUserUserSeq(userSeq).orElseThrow(() -> new BaseException(ErrorCode.SERVICE_SERVLET_ERROR));
            System.out.println("userImage:"+ userImage.getUserImageUrl()+" githubuserimageurl: "+githubUserImageUrl);
            System.out.println("usernickname:"+ userNickname.getUserNickname()+" githubnickname: "+ githubUserNickname);
            if(!userImage.getUserImageUrl().equals(githubUserImageUrl)){
                userImage.setUserImageUrl(githubUserImageUrl);
                userImageRespository.save(userImage);
            }
            if(!userNickname.equals(githubUserNickname)){
                userNickname.setUserNickname(githubUserNickname);
                userNicknameRespository.save(userNickname);
            }

            return true;
        }
        else{
            User newUser = User.builder().userGithubId(githubUserIdInfoDTO.getUserGithubId()).build();

            UserStatus userStatus = UserStatus.builder().user(newUser).userStatusStatus(
                UserStatusType.AVAILABLE).build();

            UserNickname userNickname = UserNickname.builder().userNickname(githubUserNickname).user(newUser).build();
            UserImage userImage = UserImage.builder().userImageUrl(githubUserImageUrl).user(newUser).build();

            newUser.getUserStatuses().add(userStatus);
            newUser.setUserNickname(userNickname);
            newUser.setUserImage(userImage);
            userRepository.save(newUser);

//            throw new BaseException(ErrorCode.UNVALID_USER,methodName);
            return false;
        }
    }
}
