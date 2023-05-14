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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
      tokenExpiredTime=EXTENSION_TOKEN_EXPIRATION_TIME;
      System.out.println("익스텐션");
    }
    else {
      tokenExpiredTime=ACCESS_TOKEN_EXPIRATION_TIME;
      System.out.println("엑세스토큰");
    }

     String token = Jwts.builder()
        .claim("userGithubId",tokenGenerateDTO.getUserGithubId())
         .claim("userSeq",tokenGenerateDTO.getUserSeq())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + tokenExpiredTime))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
     return TokenDTO.builder().token(token).build();
  }
  @Override
  public TokenDTO generateRefreshToken(TokenGenerateDTO tokenGenerateDTO) {
    String token = Jwts.builder()
        .claim("userGithubId",tokenGenerateDTO.getUserGithubId())
        .claim("userSeq",tokenGenerateDTO.getUserSeq())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
//    refreshTokenRepository.save(RefreshToken.builder().refreshToken(token).userGithubId(tokenGenerateDTO.getUserGithubId()).build());
    return TokenDTO.builder().token(token).build();
  }
  @Override
  public TokenStatus validateToken(TokenDTO tokenDTO) {

    try {
      Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(tokenDTO.getToken());
      System.out.println("jwt굳");
      return TokenStatus.VALID;
    } catch (ExpiredJwtException expiredJwtException) {
      System.out.println("jwt만료");
      return TokenStatus.EXPIRED;
    } catch (JwtException jwtException){
      System.out.println("jwt 타당x");
      return TokenStatus.INVALID;
    }
  }
  @Override
  public TokenInfo getGithubIdFromToken(TokenDTO tokenDTO){
    String jwt = tokenDTO.getToken();
    System.out.println("getgituhㅇㅁㄴㅇㅁㄴㅇ"+jwt);
    try{
      Jws<Claims> jws = Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(jwt);
      String userGithubId =jws.getBody().get("userGithubId", String.class);
      System.out.println(userGithubId+"깃허브용");
      long userSeq = jws.getBody().get("userSeq", Long.class);
      System.out.println("유저시크요"+userSeq);
      return TokenInfo.builder().userGithubId(userGithubId).userSeq(userSeq).build();
    }catch (JwtException e){
      throw new BaseException(ErrorCode.UNVALID_TOKEN);
    }

  }
  @Override
  public TokenStatus validateRefreshTokenFromRedis(TokenDTO tokenDTO) {

    return null;
  }

  @Override
  public TokenInfo parseToken(String token) {
    Jws<Claims> claimsJws = Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token);

    return TokenInfo.builder()
        .userGithubId(claimsJws.getBody().get("userGithubId", String.class))
        .userSeq(claimsJws.getBody().get("userSeq",Long.class))
        .build();
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
