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


  @PostMapping("/code")
  public ResponseEntity<?> getCode (@RequestBody CodeDTO codeDTO, HttpServletResponse response){
    System.out.println("dddddddddd"+codeDTO.isExtension());
    LoginProcessDTO loginProcessDTO =authService.loginProcess(GithubCodeResponseDTO.builder().code(
        codeDTO.getCode()).isExtension(codeDTO.isExtension()).build());
    response.addHeader("Authorization",loginProcessDTO.getAccessToken());
    response.addCookie(loginProcessDTO.getCookie());

    return new ResponseEntity<>("fd",HttpStatus.OK);
  }



  @GetMapping("/github")
  public RedirectView redirect(HttpServletResponse response){
    RedirectView redirectView = new RedirectView();
    String githubRedirectURL = authService.setGithubRedirectURL();
    redirectView.setUrl(githubRedirectURL);

    return redirectView;
  }

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
