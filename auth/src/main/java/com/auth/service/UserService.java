package com.auth.service;

import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.UserServiceIdResponseDTO;

public interface UserService {
  /**
   * User Service에 ID가 존재하는지 체크합니다
   * @author Lee an chae
   * @param gitHubUserResponseDTO
   * @return
   */
  public UserServiceIdResponseDTO checkId(GithubUserResponseDTO gitHubUserResponseDTO);
}
