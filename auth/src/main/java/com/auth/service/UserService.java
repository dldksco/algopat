package com.auth.service;

import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.UserServiceIdResponseDTO;

public interface UserService {
  public UserServiceIdResponseDTO checkId(GithubUserResponseDTO gitHubUserResponseDTO);
}
