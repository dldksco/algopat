package com.auth.controller;

import com.auth.domain.ErrorCode;
import com.auth.domain.TokenStatus;
import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.dto.TokenInfo;
import com.auth.exception.BaseException;
import com.auth.service.TokenService;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
@Slf4j
public class TokenController {
  private final TokenService tokenService;


  @GetMapping("/parse")
  public ResponseEntity<TokenInfo> parseToken(@RequestHeader HttpHeaders headers){

      String token = headers.getFirst("Authorization");
      TokenInfo tokenInfo=tokenService.parseToken(token);
      return new ResponseEntity<>(tokenInfo,HttpStatus.OK);

  }



  @GetMapping("/accesstoken")
  public ResponseEntity<?> checkRefreshTokenIssueAccessToken(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    String refreshToken = null;
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("refreshToken")) {
          refreshToken = cookie.getValue();
          log.info("find complete refreshToken at cookie");
          break;
        }
      }
      log.info("refresh token:"+ refreshToken);
      if (refreshToken == null) {
        log.error("refreshToken is null");
        return new ResponseEntity<>(TokenStatus.TOKEN_NOT_FOUND.getMessage(),TokenStatus.TOKEN_NOT_FOUND.getStatus());
      }else{
        log.info("start IssueAccestoken at checkRefreshTokenIssueAccessToken");
        TokenDTO tokenDTO = TokenDTO.builder().token(refreshToken).build();
        TokenStatus tokenStatus = tokenService.validateToken(tokenDTO);
        if(tokenStatus==TokenStatus.VALID){
          log.info("tokenstatus is valid");
          TokenInfo tokenInfo =tokenService.getGithubIdFromToken(tokenDTO);
          tokenDTO.setToken(tokenService.generateAccessToken(TokenGenerateDTO.builder().userGithubId(tokenInfo.getUserGithubId()).userSeq(tokenInfo.getUserSeq()).isExtension("NO").build()).getToken());
          HttpHeaders headers = new HttpHeaders();
          headers.add("Authorization", tokenDTO.getToken());
          return new ResponseEntity<>(TokenStatus.ISSUED_ACCESS_TOKEN,headers,TokenStatus.ISSUED_ACCESS_TOKEN.getStatus());
        }else{
          log.error("error checkRefreshTokenIssueAccessToken: "+ tokenStatus.getMessage());
          return new ResponseEntity<>(tokenStatus.getMessage(),tokenStatus.getStatus());
        }

      }

    }else{
      log.error("cookie is null");
      return new ResponseEntity<>(TokenStatus.TOKEN_NOT_FOUND.getMessage(),TokenStatus.TOKEN_NOT_FOUND.getStatus());
    }
  }
}
