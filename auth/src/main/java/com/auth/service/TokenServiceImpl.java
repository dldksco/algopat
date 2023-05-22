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
private static final long ACCESS_TOKEN_EXPIRATION_TIME = 3000; // 1 day (in milliseconds)
  private static final long EXTENSION_TOKEN_EXPIRATION_TIME = 86400_000; // 1 day (in milliseconds)
  private static final long REFRESH_TOKEN_EXPIRATION_TIME = 86400_000; // 1 day (in milliseconds)
  private final Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  /**
   * accesstoken을 생성해줍니다.
   * @author Lee an chae
   * @param tokenGenerateDTO
   * @return
   */
  @Override
  public TokenDTO generateAccessToken(TokenGenerateDTO tokenGenerateDTO) {
    String isExtension= tokenGenerateDTO.getIsExtension();
    long tokenExpiredTime=0;
    //익스텐션용 토큰인지, accesstoken인지 판별해줍니다.
    if(isExtension.equals("YES")){
      tokenExpiredTime=EXTENSION_TOKEN_EXPIRATION_TIME;
    }
    else {
      tokenExpiredTime=ACCESS_TOKEN_EXPIRATION_TIME;
    }
    //토큰 생성
     String token = Jwts.builder()
        .claim("userGithubId",tokenGenerateDTO.getUserGithubId())
         .claim("userSeq",tokenGenerateDTO.getUserSeq())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + tokenExpiredTime))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
     return TokenDTO.builder().token(token).build();
  }

  /**
   * 리프레쉬 토큰 생성
   * @author Lee an chae
   * @param tokenGenerateDTO
   * @return
   */
  @Override
  public TokenDTO generateRefreshToken(TokenGenerateDTO tokenGenerateDTO) {
    //refresh 토큰을 발급해줍니다.
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

  /**
   * 토큰이 유효한지 확인해줍니다.
   * @author Lee an chae
   * @param tokenDTO
   * @return
   *
   */
  @Override
  public TokenStatus validateToken(TokenDTO tokenDTO) {
    //토큰 타당한지 유효성검사
    try {
      Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(tokenDTO.getToken());
      return TokenStatus.VALID;
    } catch (ExpiredJwtException expiredJwtException) {
    //만료된 토큰
      return TokenStatus.EXPIRED;
    } catch (JwtException jwtException){
    //이외 다른 에러
      return TokenStatus.INVALID;
    }
  }

  /**
   * AccessToken을 이용해 githubid, userSeq를 추출합니다.
   * @param tokenDTO
   * @return
   */
  @Override
  public TokenInfo getGithubIdFromToken(TokenDTO tokenDTO){
    String jwt = tokenDTO.getToken();
    try{

      Jws<Claims> jws = Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(jwt);
      String userGithubId =jws.getBody().get("userGithubId", String.class);
      long userSeq = jws.getBody().get("userSeq", Long.class);
      return TokenInfo.builder().userGithubId(userGithubId).userSeq(userSeq).build();
    }catch (JwtException e){
      throw new BaseException(ErrorCode.UNVALID_TOKEN);
    }

  }
  @Override
  public TokenStatus validateRefreshTokenFromRedis(TokenDTO tokenDTO) {

    return null;
  }

  /**
   * token에서 유저 정보를 parsing합니다.
   * @author Lee an chae
   * @param token
   * @return
   */
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

  /**
   * 쿠키에 refreshtoken을 넣어줍니다.
   * @author Lee an chae
   * @param tokenDTO
   * @return
   */
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
