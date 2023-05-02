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
//    Map<String, String> requestBody = new HashMap<>();
//    requestBody.put("user_github_id", gitHubUserResponseDTO.getUserGithubId());
//    try{
//      userServiceFeignClient.userCheck(UserServiceIdRequestDTO.builder().userGithubId(gitHubUserResponseDTO.getUserGithubId()).build());
//    }catch (FeignException f){
//      System.out.println(f.status());
//      ByteBuffer byteBuffer = f.responseBody().get();
//      String responseBody = StandardCharsets.UTF_8.decode(byteBuffer).toString();
//      System.out.println("Response body: " + responseBody);
//    }

  }

}
