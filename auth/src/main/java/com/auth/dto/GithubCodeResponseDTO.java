package com.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GithubCodeResponseDTO {
  private String code;

}
