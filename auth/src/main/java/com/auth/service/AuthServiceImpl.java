package com.auth.service;

import com.auth.dto.GithubAccessTokenResponseDTO;
import com.auth.dto.GithubCodeResponseDTO;
import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.LoginProcessDTO;
import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.dto.UserServiceIdResponseDTO;
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

  /**
   * 로그인 과정을 진행합니다.
   * @author Lee an chae
   * @param githubCodeResponseDTO
   * @return
   */
  @Override
  public LoginProcessDTO loginProcess(GithubCodeResponseDTO githubCodeResponseDTO) {
    LoginProcessDTO loginProcessDTO = new LoginProcessDTO();
    //깃허브로부터 AccessToken을 받아옵니다.
    GithubAccessTokenResponseDTO githubAccessTokenResponseDTO = requestGithubAccessToken(
        githubCodeResponseDTO);
    //깃허브로부터 받아온 Accestoken을 이용해 깃허브에 다시 github user 정보를 요청합니다.
    GithubUserResponseDTO githubUserResponseDTO = requestGithubUserInfo(
        githubAccessTokenResponseDTO);
    //깃허브로부터 받아온 github user 정보를 통해 우리 서비스에 등록되어있는지 확인합니다.
    UserServiceIdResponseDTO userServiceIdResponseDTO = userService.checkId(githubUserResponseDTO);
    //Accestoken을 생성 후 담아줍니다.
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
    //refreshtoken을 생성 후 담아줍니다.
    Cookie cookie = tokenService.createRefreshTokenCookie(refreshToken);
    loginProcessDTO.setCookie(cookie);

    return loginProcessDTO;
  }

  /**
   * github로부터 Accestoken을 요청합니다
   * @author Lee an chae
   * @param githubCodeResponseDTO
   * @return
   */
  @Override
  public GithubAccessTokenResponseDTO requestGithubAccessToken(
      GithubCodeResponseDTO githubCodeResponseDTO) {
    //깃허브로에 요청을 하기 위한 세팅
    String url = "https://github.com/login/oauth/access_token";
    String code = githubCodeResponseDTO.getCode();
    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("client_id", clientId);
    body.add("client_secret", clientSecret);
    body.add("code", code);
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

    //rest template을 통해 github에 요청 후 필요 정보를 받아옵니다.
    GithubAccessTokenResponseDTO githubAccessTokenResponse = restTemplate.postForObject(url,
        request, GithubAccessTokenResponseDTO.class);
    return githubAccessTokenResponse;
  }


  /**
   * 깃허브 엑세스 토큰을 이용하여 깃허브 유저 정보를 받아옵니다.
   * @param githubAccessTokenResponseDTO
   * @return
   */
  @Override
  public GithubUserResponseDTO requestGithubUserInfo(
      GithubAccessTokenResponseDTO githubAccessTokenResponseDTO) {
    //깃허브 유저 정보를 받아오기 위한 세팅 시작
    String githubaAccessToken = githubAccessTokenResponseDTO.getGitHubaAccessToken();
    String url = "https://api.github.com/user";
    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.valueOf("application/vnd.github+json")));
    headers.set("Authorization", "Bearer " + githubaAccessToken);

    HttpEntity<String> request = new HttpEntity<>(headers);

    //Resttemplate을 이용해 github에서 유저 정보를 받아옵니다.
    ResponseEntity<GithubUserResponseDTO> response = restTemplate.exchange(
        url,
        HttpMethod.GET,
        request,
        GithubUserResponseDTO.class
    );
    GithubUserResponseDTO githubUserResponseDTO = response.getBody();
    return githubUserResponseDTO;
  }

  /**
   * github redirect URL을 세팅해줍니다.
   * @author Lee an chae
   * @return
   */
  @Override
  public String setGithubRedirectURL() {
    String githubRedirectBaseURL = "https://github.com/login/oauth/authorize";
    String githubRedirectURL =
        githubRedirectBaseURL + "?client_id=" + clientId;
    return githubRedirectURL;
  }

}
