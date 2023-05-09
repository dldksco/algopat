package com.auth.service;

import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.UserServiceIdRequestDTO;
import com.auth.service.feign.UserServiceFeignClient;
import feign.FeignException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserServiceFeignClient userServiceFeignClient;
  @Override
  public void checkId(GithubUserResponseDTO gitHubUserResponseDTO) {

      userServiceFeignClient.userCheck(UserServiceIdRequestDTO.builder().userGithubId(gitHubUserResponseDTO.getUserGithubId()).userImageUrl(
          gitHubUserResponseDTO.getUserImageUrl()).build());
  }

}
