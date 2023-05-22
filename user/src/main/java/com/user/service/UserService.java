package com.user.service;

import com.user.domain.UserSubmitCount;
import com.user.dto.BackjoonUserDTO;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;
import com.user.dto.UserSubmitCountDTO;
import com.user.dto.UserTransactionDTO;

public interface UserService {
  /**
   * 깃허브 아이디를 통해 우리 서비스에 가입했는지 확인 후, 안했다면 가입합니다.
   * @author Lee an chae
   * @param githubUserIdInfoDTO
   * @return
   */
  public UserCheckResponseDTO checkAndJoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO);
  /**
   * 회원등록
   * @author Lee an chae
   * @param githubUserIdInfoDTO
   * @return
   */
  public long joinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO);
  /**
   * 백준 아이디가 등록되었는지 확인 후, 등록되지 않았다면 등록합니다
   * @author Lee an chae
   * @param backjoonUserDTO
   */
  public void checkAndJoinBackjoonUser(BackjoonUserDTO backjoonUserDTO);

  /**
   * user profile을 return 합니다
   * @author Lee an chae
   * @param userSeq
   * @return
   */
  public UserInfo userProfile(Long userSeq);

  /**
   * user 문제 제출 횟수를 증가시킵니다.
   * @author Lee an chae
   * @param userTransactionDTO
   */
  public void plusUserSubmitCount(UserTransactionDTO userTransactionDTO);

  /**
   * user 문제 제출 횟수를 감소시킵니다.
   * @author Lee an chae
   * @param userTransactionDTO
   */
  public void minusUserSubmitCount(UserTransactionDTO userTransactionDTO);
  /**
   * 유저 문제 제출 횟수를 리턴합니다.
   * @author Lee an chae
   * @param userSeq
   * @return
   */

  public UserSubmitCountDTO findUserSubmitCount(Long userSeq);


}
