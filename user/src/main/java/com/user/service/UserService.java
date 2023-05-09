package com.user.service;

import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;

public interface UserService {
  public UserCheckResponseDTO userCheck(GithubUserIdInfoDTO githubUserIdInfoDTO);

}
