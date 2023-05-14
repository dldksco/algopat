package com.auth.service;

import com.auth.domain.ErrorCode;
import com.auth.dto.GithubAccessTokenResponseDTO;
import com.auth.dto.GithubCodeResponseDTO;
import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.LoginProcessDTO;
import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.dto.UserServiceIdResponseDTO;
import com.auth.exception.BaseException;
import java.util.Collections;
import javax.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserService userService;
  private final TokenService tokenService;
  private final RestTemplate restTemplate;
  @Value("${client-id}")
  private String clientId;
  @Value("${client-secret}")
  private String clientSecret;
  @Value("${redirect-uri}")
  private String redirectURI;

  //헤더에 엑세스토큰담는 작업해야함
  @Override
  public LoginProcessDTO loginProcess(GithubCodeResponseDTO githubCodeResponseDTO) {

    LoginProcessDTO loginProcessDTO = new LoginProcessDTO();

    GithubAccessTokenResponseDTO githubAccessTokenResponseDTO = requestGithubAccessToken(
        githubCodeResponseDTO);

    GithubUserResponseDTO githubUserResponseDTO = requestGithubUserInfo(
        githubAccessTokenResponseDTO);

    UserServiceIdResponseDTO userServiceIdResponseDTO = userService.checkId(githubUserResponseDTO);

    TokenDTO accessToken = tokenService.generateAccessToken(
        TokenGenerateDTO.builder()
            .userGithubId(githubUserResponseDTO.getUserGithubId())
            .isExtension(githubCodeResponseDTO.getIsExtension())
            .userSeq(userServiceIdResponseDTO.getUserSeq())
            .build());
    loginProcessDTO.setAccessToken(accessToken.getToken());

    TokenDTO refreshToken = tokenService.generateRefreshToken(
        TokenGenerateDTO.builder().userGithubId(githubUserResponseDTO.getUserGithubId()).userSeq(
            userServiceIdResponseDTO.getUserSeq()).build());

    Cookie cookie = tokenService.createRefreshTokenCookie(refreshToken);
    loginProcessDTO.setCookie(cookie);
    return loginProcessDTO;
  }

  @Override
  public GithubAccessTokenResponseDTO requestGithubAccessToken(
      GithubCodeResponseDTO githubCodeResponseDTO) {

    String url = "https://github.com/login/oauth/access_token";
    String code = githubCodeResponseDTO.getCode();

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("client_id", clientId);
    body.add("client_secret", clientSecret);
    body.add("code", code);
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
    try{
      GithubAccessTokenResponseDTO githubAccessTokenResponse = restTemplate.postForObject(url,
          request, GithubAccessTokenResponseDTO.class);
      return githubAccessTokenResponse;
    }catch (Exception e){
      log.error("error reqeust github accesstoken");
      log.debug("github code: :" + code);
      throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
    }


  }

  @Override
  public GithubUserResponseDTO requestGithubUserInfo(
      GithubAccessTokenResponseDTO githubAccessTokenResponseDTO) {

    String githubaAccessToken = githubAccessTokenResponseDTO.getGitHubaAccessToken();
    String url = "https://api.github.com/user";

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.valueOf("application/vnd.github+json")));
    headers.set("Authorization", "Bearer " + githubaAccessToken);

    HttpEntity<String> request = new HttpEntity<>(headers);
    try{
      log.info("request githubuserInfo");
      ResponseEntity<GithubUserResponseDTO> response = restTemplate.exchange(
          url,
          HttpMethod.GET,
          request,
          GithubUserResponseDTO.class
      );
      GithubUserResponseDTO githubUserResponseDTO = response.getBody();
      return githubUserResponseDTO;
    }catch (Exception e){
      log.error("error request github user info");

      throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
    }

  }

  @Override
  public String setGithubRedirectURL() {

    String githubRedirectBaseURL = "https://github.com/login/oauth/authorize";
    String githubRedirectURL =
        githubRedirectBaseURL + "?client_id=" + clientId;
    return githubRedirectURL;
  }

}
