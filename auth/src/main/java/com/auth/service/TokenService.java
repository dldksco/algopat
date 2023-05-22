package com.auth.service;

import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.domain.TokenStatus;
import com.auth.dto.TokenInfo;
import javax.servlet.http.Cookie;

public interface TokenService {
  /**
   * accesstoken을 생성해줍니다.
   * @author Lee an chae
   * @param tokenGenerateDTO
   * @return
   */
  public TokenDTO generateAccessToken(TokenGenerateDTO tokenGenerateDTO);
  /**
   * 토큰이 유효한지 확인해줍니다.
   * @author Lee an chae
   * @param tokenDTO
   * @return
   *
   */
  public TokenStatus validateToken(TokenDTO tokenDTO);
  /**
   * AccessToken을 이용해 githubid, userSeq를 추출합니다.
   * @param tokenDTO
   * @return
   */

  public TokenInfo getGithubIdFromToken(TokenDTO tokenDTO);
  /**
   * 리프레쉬 토큰 생성
   * @author Lee an chae
   * @param tokenGenerateDTO
   * @return
   */
  public TokenDTO generateRefreshToken(TokenGenerateDTO tokenGenerateDTO);
  /**
   * 쿠키에 refreshtoken을 넣어줍니다.
   * @author Lee an chae
   * @param tokenDTO
   * @return
   */
  public Cookie createRefreshTokenCookie(TokenDTO tokenDTO);
  public TokenStatus validateRefreshTokenFromRedis(TokenDTO tokenDTO);
  /**
   * token에서 유저 정보를 parsing합니다.
   * @author Lee an chae
   * @param token
   * @return
   */
  public TokenInfo parseToken(String token);

}
