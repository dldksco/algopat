package com.code.service;

import com.code.data.dto.UserServiceBackjoonRequestDto;
import com.code.service.fegin.UserServiceFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserServiceFeignClient userServiceFeignClient;
  @Override
  public void checkBackjoonId(UserServiceBackjoonRequestDto userServiceBackjoonRequestDto) {
    userServiceFeignClient.userCheck(userServiceBackjoonRequestDto);
  }
}
