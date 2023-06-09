package com.auth.controller;

import com.auth.dto.CodeDTO;
import com.auth.dto.GithubCodeResponseDTO;
import com.auth.dto.LoginProcessDTO;
import com.auth.dto.TokenDTO;
import com.auth.domain.TokenStatus;
import com.auth.service.AuthService;
import com.auth.service.TokenService;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  private final TokenService tokenService;
  @Value("${client-id}")
  private String clientId;

  /**
   * 깃허브로부터 받은 code를 이용해 회원가입 및 로그인을 수행합니다.
   * @author Lee an chae
   * @param codeDTO
   * @param response
   * @return
   */
  @PostMapping("/code")
  public ResponseEntity<?> getCode (@RequestBody CodeDTO codeDTO, HttpServletResponse response){
    LoginProcessDTO loginProcessDTO =authService.loginProcess(GithubCodeResponseDTO.builder().code(
        codeDTO.getCode()).isExtension(codeDTO.getIsExtension()).build());
    response.addHeader("Authorization",loginProcessDTO.getAccessToken());
    response.addCookie(loginProcessDTO.getCookie());

    return new ResponseEntity<>("",HttpStatus.OK);
  }

  /**
   * github 인증을 위한 페이지로 redirect 시킵니다.
   * @author Lee an chae
   * @param response
   * @return
   */

  @GetMapping("/github")
  public RedirectView redirect(HttpServletResponse response){
    RedirectView redirectView = new RedirectView();
    String githubRedirectURL = authService.setGithubRedirectURL();
    redirectView.setUrl(githubRedirectURL);

    return redirectView;
  }

  /**
   * 토큰이 타당한지 확인 후, 인증을 해주는 로직입니다.
   * @author Lee an chae
   * @param jwt
   * @return
   */
  @GetMapping("/validate")
  public ResponseEntity<?> checkTokenValidate(@RequestHeader("Authorization") String jwt){
    if(jwt != null){
      TokenDTO tokenDTO = TokenDTO.builder().token(jwt).build();
      TokenStatus tokenStatus =tokenService.validateToken(tokenDTO);
      return new ResponseEntity<>(tokenStatus.getMessage(),tokenStatus.getStatus());
    }else{
      return new ResponseEntity<>("타당하지 않은 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }





}
