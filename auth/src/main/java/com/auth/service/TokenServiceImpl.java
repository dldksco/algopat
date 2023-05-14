package com.auth.service;

import com.auth.domain.ErrorCode;
import com.auth.domain.RefreshToken;
import com.auth.dto.TokenDTO;
import com.auth.dto.TokenGenerateDTO;
import com.auth.domain.TokenStatus;
import com.auth.dto.TokenInfo;
import com.auth.exception.BaseException;
//import com.auth.repository.RefreshTokenRepository;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
//  private final RefreshTokenRepository refreshTokenRepository;
  @Value("${secret-key}")
  private String SECRET_KEY;
//  private static final long ACCESS_TOKEN_EXPIRATION_TIME = 86400_000; // 1 day (in milliseconds)
private static final long ACCESS_TOKEN_EXPIRATION_TIME = 1000*30; // 15 min (in milliseconds)
  private static final long EXTENSION_TOKEN_EXPIRATION_TIME = 1000*60*60*24*365; // 1 day (in milliseconds)
  private static final long REFRESH_TOKEN_EXPIRATION_TIME = 86400_000; // 1 day (in milliseconds)
  private final Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
  @Override
  public TokenDTO generateAccessToken(TokenGenerateDTO tokenGenerateDTO) {
    String isExtension= tokenGenerateDTO.getIsExtension();
    long tokenExpiredTime=0;
    if(isExtension.equals("YES")){
      log.info("issue Extension Token");
      tokenExpiredTime=EXTENSION_TOKEN_EXPIRATION_TIME;
    }
    else {
      log.info("issue Access Token");
      tokenExpiredTime=ACCESS_TOKEN_EXPIRATION_TIME;
    }
    try{
      String token = Jwts.builder()
          .claim("userGithubId",tokenGenerateDTO.getUserGithubId())
          .claim("userSeq",tokenGenerateDTO.getUserSeq())
          .setIssuedAt(new Date(System.currentTimeMillis()))
          .setExpiration(new Date(System.currentTimeMillis() + tokenExpiredTime))
          .signWith(getSigningKey(), SignatureAlgorithm.HS256)
          .compact();
      return TokenDTO.builder().token(token).build();
    }catch (JwtException j){
      log.error("fail generate token",j);
      log.debug("tokenGenerateDTO : "+ tokenGenerateDTO.toString());
      throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
    }

  }
  @Override
  public TokenDTO generateRefreshToken(TokenGenerateDTO tokenGenerateDTO) {
    try{
      String token = Jwts.builder()
          .claim("userGithubId",tokenGenerateDTO.getUserGithubId())
          .claim("userSeq",tokenGenerateDTO.getUserSeq())
          .setIssuedAt(new Date(System.currentTimeMillis()))
          .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
          .signWith(getSigningKey(), SignatureAlgorithm.HS256)
          .compact();
      return TokenDTO.builder().token(token).build();
    }catch (JwtException j){
        log.error("fail generateRefreshToken",j);
        log.debug("tokenGenerateDTO : "+ tokenGenerateDTO.toString());
        throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
    }
//    refreshTokenRepository.save(RefreshToken.builder().refreshToken(token).userGithubId(tokenGenerateDTO.getUserGithubId()).build());

  }
  @Override
  public TokenStatus validateToken(TokenDTO tokenDTO) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(tokenDTO.getToken());
      log.info("is valid token");
      return TokenStatus.VALID;
    } catch (ExpiredJwtException expiredJwtException) {
      log.warn("jwt Expired");
      return TokenStatus.EXPIRED;
    } catch (JwtException jwtException){
      log.error("is not valid Token",jwtException);
      log.debug("token DTO: "+ tokenDTO.toString());
      return TokenStatus.INVALID;
    }
  }
  @Override
  public TokenInfo getGithubIdFromToken(TokenDTO tokenDTO){
    String jwt = tokenDTO.getToken();
    try{
      log.info("start parse token in getGithubIdFromToken");
      Jws<Claims> jws = Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(jwt);
      String userGithubId =jws.getBody().get("userGithubId", String.class);
      long userSeq = jws.getBody().get("userSeq", Long.class);
      log.info("end parse token in getGithubIdFromToken");
      return TokenInfo.builder().userGithubId(userGithubId).userSeq(userSeq).build();
    }catch (JwtException e){
      log.error("error parse token in getGithubIdFromToken",e);
      log.debug("tokenDto : " + tokenDTO.toString());
      throw new BaseException(ErrorCode.UNVALID_TOKEN);
    }

  }
  @Override
  public TokenStatus validateRefreshTokenFromRedis(TokenDTO tokenDTO) {

    return null;
  }

  @Override
  public TokenInfo parseToken(String token) {
    try{
      Jws<Claims> claimsJws = Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(token);
      return TokenInfo.builder()
          .userGithubId(claimsJws.getBody().get("userGithubId", String.class))
          .userSeq(claimsJws.getBody().get("userSeq",Long.class))
          .build();
    }catch (JwtException j){
      log.error("error parseToken");
      log.debug("token : "+token);
      throw new BaseException(ErrorCode.UNVALID_TOKEN);
    }


  }

  @Override
  public Cookie createRefreshTokenCookie(TokenDTO tokenDTO) {
    try
    {
      Cookie refreshTokenCookie = new Cookie("refreshToken", tokenDTO.getToken());
      refreshTokenCookie.setHttpOnly(true);
      refreshTokenCookie.setSecure(true); // HTTPS를 사용하는 경우에만 쿠키를 전송합니다.
      refreshTokenCookie.setPath("/");
      refreshTokenCookie.setMaxAge((int)REFRESH_TOKEN_EXPIRATION_TIME);
      return refreshTokenCookie;
    }catch (Exception e){
      log.error("error createRefreshTokenCookie");
      log.debug("tokenDTO : "+tokenDTO.toString());
      throw new BaseException(ErrorCode.SERVICE_SERVLET_ERROR);
    }

  }

}
