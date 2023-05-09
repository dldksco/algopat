package com.auth.service;

import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.domain.TokenStatus;
import com.auth.dto.TokenInfo;
import javax.servlet.http.Cookie;

public interface TokenService {
  public TokenDTO generateAccessToken(TokenGenerateDTO tokenGenerateDTO);
  public TokenStatus validateToken(TokenDTO tokenDTO);

  public String getGithubIdFromToken(TokenDTO tokenDTO);
  public TokenDTO generateRefreshToken(TokenGenerateDTO tokenGenerateDTO);

  public Cookie createRefreshTokenCookie(TokenDTO tokenDTO);
  public TokenStatus validateRefreshTokenFromRedis(TokenDTO tokenDTO);

  public TokenInfo parseToken(String token);

}
