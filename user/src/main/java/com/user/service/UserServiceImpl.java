package com.user.service;

import com.user.domain.ErrorCode;
import com.user.domain.User;
import com.user.domain.UserImage;
import com.user.domain.UserStatus;
import com.user.domain.UserStatusType;
import com.user.dto.BackjoonUserDTO;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;
import com.user.exception.BaseException;
import com.user.repository.UserImageRespository;
import com.user.repository.UserRepository;
import com.user.repository.UserStatusRepository;
import java.util.Optional;
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


    @Override
    @Transactional
    public UserCheckResponseDTO checkAndJoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO){
        String githubUserId = githubUserIdInfoDTO.getUserGithubId();
        String githubUserImageUrl = githubUserIdInfoDTO.getUserImageUrl();
        Optional<User> user = userRepository.findByUserGithubId(githubUserId);
        if(user.isPresent()){
            Long userSeq = user.get().getUserSeq();
            UserStatus userStatus = userStatusRepository.findTopByUserUserSeqOrderByUserStatusCreatedAtDesc(userSeq).orElseThrow(() -> new BaseException(ErrorCode.SERVICE_SERVLET_ERROR));
            if(!userStatus.getUserStatusStatus().equals(UserStatusType.AVAILABLE)){
                log.error("is UNVALID USER");

                throw new BaseException(ErrorCode.UNVALID_USER);
            }

            UserImage  userImage = userImageRespository.findByUserUserSeqWithFetchJoin(userSeq).orElseThrow(() -> {
                log.error("find user image error");
               return new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
            });

            if(!userImage.getUserImageUrl().equals(githubUserImageUrl)){
                userImage.setUserImageUrl(githubUserImageUrl);
                userImageRespository.save(userImage);
            }



            return UserCheckResponseDTO.builder().userSeq(userSeq).build();
        }
        else{
            long newUserSeq =JoinGithubUser(githubUserIdInfoDTO);
            return UserCheckResponseDTO.builder().userSeq(newUserSeq).build();
        }
    }

    @Override
    public long JoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO) {
        User newUser = User.builder().userGithubId(githubUserIdInfoDTO.getUserGithubId()).build();

        UserStatus userStatus = UserStatus.builder().user(newUser).userStatusStatus(
            UserStatusType.AVAILABLE).build();

        UserImage userImage = UserImage.builder().userImageUrl(githubUserIdInfoDTO.getUserImageUrl()).user(newUser).build();

        newUser.getUserStatuses().add(userStatus);
        newUser.setUserImage(userImage);
        userRepository.save(newUser);


        return newUser.getUserSeq();
    }

    @Override
    public void checkAndJoinBackjoonUser(BackjoonUserDTO backjoonUserDTO) {
        User user = userRepository.findByUserSeq(backjoonUserDTO.getUserSeq()).orElseThrow(() -> {
            log.error("can not find backjoon id");
            return new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });
        if(user.getUserBackjoonId().equals("NO_SUBMITTED")){
            log.info("first SUBMIT :" + user.getUserGithubId());
            user.setUserBackjoonId(backjoonUserDTO.getUserBackjoonId());
        }
        userRepository.save(user);

    }



    @Override
    public UserInfo userProfile(Long userSeq) {
        UserImage  userImage = userImageRespository.findByUserUserSeqWithFetchJoin(userSeq).orElseThrow(() -> {
            log.error("can not find user Image");
            return new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
        });
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(()->{
            log.info("can not find user");
            return new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });

        return UserInfo.builder()
            .userGithubId(user.getUserGithubId())
            .userImageUrl(userImage.getUserImageUrl())
            .userBackjoonId(user.getUserBackjoonId())
            .build();
    }
}
