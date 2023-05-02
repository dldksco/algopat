package com.auth.service.feign;

import com.auth.dto.UserServiceIdRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "userService", url = "http://localhost:28081/")
public interface UserServiceFeignClient {
//  @PostMapping("/user/check")
//  ResponseEntity<abcd> userCheck(@RequestBody UserServiceIdRequestDTO userServiceIdRequestDTO);
}
