package com.auth.service.feign;

import com.auth.config.FeignClientConfiguration;
import com.auth.dto.UserServiceIdRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "GATEWAY",configuration = FeignClientConfiguration.class)
public interface UserServiceFeignClient {
  @PostMapping("/user/check")
  ResponseEntity<Boolean> userCheck(@RequestBody UserServiceIdRequestDTO userServiceIdRequestDTO);
}
