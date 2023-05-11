package com.auth.service;

import com.auth.dto.GithubUserResponseDTO;

public interface UserService {
  public void checkId(GithubUserResponseDTO gitHubUserResponseDTO);
}
