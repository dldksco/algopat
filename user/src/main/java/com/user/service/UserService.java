package com.user.service;

import com.user.domain.UserSubmitCount;
import com.user.dto.BackjoonUserDTO;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;
import com.user.dto.UserSubmitCountDTO;

public interface UserService {
  public UserCheckResponseDTO checkAndJoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO);
  public long joinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO);
  public void checkAndJoinBackjoonUser(BackjoonUserDTO backjoonUserDTO);


  public UserInfo userProfile(Long userSeq);

  public void plusUserSubmitCount(Long userSeq);

  public void minusUserSubmitCount(Long userSeq);

  public UserSubmitCountDTO findUserSubmitCound(Long userSeq);


}
