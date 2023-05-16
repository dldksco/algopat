package com.auth.service;

import com.auth.dto.GithubAccessTokenResponseDTO;
import com.auth.dto.GithubCodeResponseDTO;
import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.LoginProcessDTO;

public interface AuthService {
  public LoginProcessDTO loginProcess(GithubCodeResponseDTO githubCodeResponseDTO);
  public GithubAccessTokenResponseDTO requestGithubAccessToken(
      GithubCodeResponseDTO githubCodeResponseDTO);
  public GithubUserResponseDTO requestGithubUserInfo(
      GithubAccessTokenResponseDTO githubAccessTokenResponseDTO);

  public String setGithubRedirectURL();
}
