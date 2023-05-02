package com.auth.service;

import com.auth.domain.ErrorCode;
import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.domain.TokenStatus;
import com.auth.exception.BaseException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import javax.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
  @Value("${secret-key}")
  private String SECRET_KEY;
  private static final long ACCESS_TOKEN_EXPIRATION_TIME = 10; // 1 day (in milliseconds)
  private static final long REFRESH_TOKEN_EXPIRATION_TIME = 86400_000; // 1 day (in milliseconds)
  private final Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
  @Override
  public TokenDTO generateAccessToken(TokenGenerateDTO tokenGenerateDTO) {
     String token = Jwts.builder()
        .claim("user_github_id",tokenGenerateDTO.getUserGithubId())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
     return TokenDTO.builder().token(token).build();
  }
  @Override
  public TokenDTO generateRefreshToken(TokenGenerateDTO tokenGenerateDTO) {
    String token = Jwts.builder()
        .claim("user_github_id",tokenGenerateDTO.getUserGithubId())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
    return TokenDTO.builder().token(token).build();
  }
  @Override
  public TokenStatus validateToken(TokenDTO tokenDTO) {

    try {
      Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(tokenDTO.getToken());
      return TokenStatus.VALID;
    } catch (ExpiredJwtException expiredJwtException) {

      return TokenStatus.EXPIRED;
    } catch (JwtException jwtException){
      return TokenStatus.INVALID;
    }
  }
  @Override
  public String getGithubIdFromToken(TokenDTO tokenDTO){
    String jwt = tokenDTO.getToken();
    try{
      Jws<Claims> jws = Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(jwt);
      return jws.getBody().get("user_github_id", String.class);
    }catch (JwtException e){
      throw new BaseException(ErrorCode.UNVALID_TOKEN,"getGithubIdFromToken");
    }

  }
  @Override
  public TokenStatus validateRefreshTokenFromRedis(TokenDTO tokenDTO) {

    return null;
  }
  @Override
  public Cookie createRefreshTokenCookie(TokenDTO tokenDTO) {
    Cookie refreshTokenCookie = new Cookie("refreshToken", tokenDTO.getToken());
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(true); // HTTPS를 사용하는 경우에만 쿠키를 전송합니다.
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge((int)REFRESH_TOKEN_EXPIRATION_TIME);
    return refreshTokenCookie;
  }

}
