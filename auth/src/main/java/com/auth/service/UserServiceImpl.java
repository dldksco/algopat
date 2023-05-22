package com.auth.service;

import com.auth.dto.GithubUserResponseDTO;
import com.auth.dto.UserServiceIdRequestDTO;
import com.auth.dto.UserServiceIdResponseDTO;
import com.auth.service.feign.UserServiceFeignClient;
import feign.FeignException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserServiceFeignClient userServiceFeignClient;

  /**
   * User Service에 ID가 존재하는지 체크합니다
   * @author Lee an chae
   * @param gitHubUserResponseDTO
   * @return
   */
  @Override
  public UserServiceIdResponseDTO checkId(GithubUserResponseDTO gitHubUserResponseDTO) {

      ResponseEntity<UserServiceIdResponseDTO> userServiceIdResponse = userServiceFeignClient.userCheck(UserServiceIdRequestDTO.builder().userGithubId(gitHubUserResponseDTO.getUserGithubId()).userImageUrl(
          gitHubUserResponseDTO.getUserImageUrl()).build());

      UserServiceIdResponseDTO userServiceIdResponseDTO = userServiceIdResponse.getBody();
      return userServiceIdResponseDTO;
  }

}
