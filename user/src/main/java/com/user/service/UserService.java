package com.user.service;

import com.user.dto.BackjoonUserDTO;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;

public interface UserService {
  public UserCheckResponseDTO checkAndJoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO);
  public long JoinGithubUser(GithubUserIdInfoDTO githubUserIdInfoDTO);
  public void checkAndJoinBackjoonUser(BackjoonUserDTO backjoonUserDTO);


  public UserInfo userProfile(Long userSeq);
}
