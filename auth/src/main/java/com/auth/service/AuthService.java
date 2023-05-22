package com.auth.service;

import com.auth.dto.GithubAccessTokenResponseDTO;
import com.auth.dto.GithubCodeResponseDTO;
import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.LoginProcessDTO;

public interface AuthService {
  /**
   * 로그인 과정을 진행합니다.
   * @author Lee an chae
   * @param githubCodeResponseDTO
   * @return
   */
  public LoginProcessDTO loginProcess(GithubCodeResponseDTO githubCodeResponseDTO);
  /**
   * github로부터 Accestoken을 요청합니다
   * @author Lee an chae
   * @param githubCodeResponseDTO
   * @return
   */
  public GithubAccessTokenResponseDTO requestGithubAccessToken(
      GithubCodeResponseDTO githubCodeResponseDTO);
  /**
   * 깃허브 엑세스 토큰을 이용하여 깃허브 유저 정보를 받아옵니다.
   * @param githubAccessTokenResponseDTO
   * @return
   */
  public GithubUserResponseDTO requestGithubUserInfo(
      GithubAccessTokenResponseDTO githubAccessTokenResponseDTO);
  /**
   * github redirect URL을 세팅해줍니다.
   * @author Lee an chae
   * @return
   */
  public String setGithubRedirectURL();
}
