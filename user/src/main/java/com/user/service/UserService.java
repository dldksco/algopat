package com.user.service;

import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;

public interface UserService {
  public UserCheckResponseDTO userCheck(GithubUserIdInfoDTO githubUserIdInfoDTO);

  public UserInfo userProfile(Long userSeq);
}
