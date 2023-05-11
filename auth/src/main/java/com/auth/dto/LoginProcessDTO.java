package com.auth.dto;

import javax.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class LoginProcessDTO {
  private String AccessToken;
  private Cookie cookie;

  private boolean checkLoginProcess;
}
