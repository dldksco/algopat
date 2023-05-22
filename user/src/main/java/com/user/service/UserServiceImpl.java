package com.user.service;

import com.user.domain.ErrorCode;
import com.user.domain.User;
import com.user.domain.UserImage;
import com.user.domain.UserStatus;
import com.user.domain.UserStatusType;
import com.user.domain.UserSubmitCount;
import com.user.dto.BackjoonUserDTO;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;
import com.user.dto.UserSubmitCountDTO;
import com.user.dto.UserTransactionDTO;
import com.user.exception.BaseException;
import com.user.repository.UserImageRespository;
import com.user.repository.UserRepository;
import com.user.repository.UserStatusRepository;
import com.user.repository.UserSubmitCountRepostiory;
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

    private final UserSubmitCountRepostiory userSubmitCountRepostiory;

    /**
     * 깃허브 아이디를 통해 우리 서비스에 가입했는지 확인 후, 안했다면 가입합니다.
     * @author Lee an chae
     * @param githubUserIdInfoDTO
     * @return
     */
    @Override
    @Transactional
    public UserCheckResponseDTO checkAndJoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO){
        String githubUserId = githubUserIdInfoDTO.getUserGithubId();
        String githubUserImageUrl = githubUserIdInfoDTO.getUserImageUrl();
        Optional<User> user = userRepository.findByUserGithubId(githubUserId);
        //가입한 유저인지 확인
        if(user.isPresent()){
            Long userSeq = user.get().getUserSeq();
            UserStatus userStatus = userStatusRepository.findTopByUserUserSeqOrderByUserStatusCreatedAtDesc(userSeq).orElseThrow(() -> {
                log.error("can not find userStatus in checkAndJoinGithubUser");
                throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
            });
            if(!userStatus.getUserStatusStatus().equals(UserStatusType.AVAILABLE)){
                //가입했지만 사용할 수 없는 유저면 에러를 발생시킵니다.
                log.error("is UNVALID USER");

                throw new BaseException(ErrorCode.UNVALID_USER);
            }
            //깃허브 유저 이미지가 달랐는지 확인 후 달라졌다면 달라진 url을 저장시킵니다.
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
            //처음 이용하는 유저이면 DB에 등록합니다.
            long newUserSeq =joinGithubUser(githubUserIdInfoDTO);
            return UserCheckResponseDTO.builder().userSeq(newUserSeq).build();
        }
    }

    /**
     * 회원등록
     * @author Lee an chae
     * @param githubUserIdInfoDTO
     * @return
     */
    @Override
    @Transactional
    public long joinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO) {
        User newUser = User.builder().userGithubId(githubUserIdInfoDTO.getUserGithubId()).build();

        UserStatus userStatus = UserStatus.builder().user(newUser).userStatusStatus(
            UserStatusType.AVAILABLE).build();

        UserImage userImage = UserImage.builder().userImageUrl(githubUserIdInfoDTO.getUserImageUrl()).user(newUser).build();

        UserSubmitCount userSubmitCount = UserSubmitCount.builder().user(newUser).build();
        newUser.getUserStatuses().add(userStatus);
        newUser.setUserImage(userImage);
        newUser.setUserSubmitCount(userSubmitCount);
        userRepository.save(newUser);


        return newUser.getUserSeq();
    }

    /**
     * 백준 아이디가 등록되었는지 확인 후, 등록되지 않았다면 등록합니다
     * @author Lee an chae
     * @param backjoonUserDTO
     */
    @Override
    @Transactional
    public void checkAndJoinBackjoonUser(BackjoonUserDTO backjoonUserDTO) {
        User user = userRepository.findByUserSeq(backjoonUserDTO.getUserSeq()).orElseThrow(() -> {
            log.error("can not find backjoon id");
            throw new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });
        if(user.getUserBackjoonId().equals("NO_SUBMITTED")){
            log.info("first SUBMIT :" + user.getUserGithubId());
            user.setUserBackjoonId(backjoonUserDTO.getUserBackjoonId());
        }
        userRepository.save(user);

    }


    /**
     * user profile을 return 합니다
     * @author Lee an chae
     * @param userSeq
     * @return
     */
    @Override
    @Transactional
    public UserInfo userProfile(Long userSeq) {
        UserImage  userImage = userImageRespository.findByUserUserSeqWithFetchJoin(userSeq).orElseThrow(() -> {
            log.error("can not find user Image");
            throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
        });
        User user = userRepository.findByUserSeq(userSeq).orElseThrow(()->{
            log.info("can not find user");
            throw new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });

        return UserInfo.builder()
            .userGithubId(user.getUserGithubId())
            .userImageUrl(userImage.getUserImageUrl())
            .userBackjoonId(user.getUserBackjoonId())
            .build();
    }

    /**
     * user 문제 제출 횟수를 증가시킵니다.
     * @author Lee an chae
     * @param userTransactionDTO
     */
    @Override
    @Transactional
    public void plusUserSubmitCount(UserTransactionDTO userTransactionDTO) {
        UserSubmitCount userSubmitCount = userSubmitCountRepostiory.findByUserUserSeqWithFetchJoin(
            userTransactionDTO.getUserSeq()).orElseThrow(()->{
            log.error("error plusUserSubmitCount");
            throw new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });
        Long userSubmitCountCount = userSubmitCount.getUserSubmitCount();
        userSubmitCount.setUserSubmitCount(userSubmitCountCount+1);
        userSubmitCountRepostiory.save(userSubmitCount);
    }

    /**
     * user 문제 제출 횟수를 감소시킵니다.
     * @author Lee an chae
     * @param userTransactionDTO
     */
    @Override
    @Transactional
    public void minusUserSubmitCount(UserTransactionDTO userTransactionDTO) {
        if (!userTransactionDTO.getOpenaiApiKey().equals("0")) {
            return;
        }
        UserSubmitCount userSubmitCount = userSubmitCountRepostiory.findByUserUserSeqWithFetchJoin(userTransactionDTO.getUserSeq()).orElseThrow(()->{
            log.error("error minusUserSubmitCount");
            throw new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });
        Long userSubmitCountCount = userSubmitCount.getUserSubmitCount();
        userSubmitCount.setUserSubmitCount(userSubmitCountCount-1);
        userSubmitCountRepostiory.save(userSubmitCount);
    }

    /**
     * 유저 문제 제출 횟수를 리턴합니다.
     * @author Lee an chae
     * @param userSeq
     * @return
     */
    @Override
    @Transactional
    public UserSubmitCountDTO findUserSubmitCount(Long userSeq) {
        UserSubmitCount userSubmitCount = userSubmitCountRepostiory.findByUserUserSeqWithFetchJoin(userSeq).orElseThrow(()->{
            log.error("find UserSubmitCount");
            throw new BaseException(ErrorCode.DATABASE_GET_ERROR);
        });
        if(userSubmitCount.getUserSubmitCount()<=0)
            throw new BaseException(ErrorCode.UNVALID_USER);
        return UserSubmitCountDTO.builder().userSubmitCountCount(userSubmitCount.getUserSubmitCount()).build();
    }
}
