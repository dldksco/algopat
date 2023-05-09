package com.code.service.fegin;

import com.code.config.FeignClientConfiguration;
import com.code.data.dto.UserServiceBackjoonRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "GATEWAY",configuration = FeignClientConfiguration.class)
public interface UserServiceFeignClient {
  @PostMapping("/user/check/backjoon-id")
  ResponseEntity<?> userCheck(@RequestBody UserServiceBackjoonRequestDto userServiceIdRequestDto);
}
