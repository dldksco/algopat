package com.user.controller;

import com.user.dto.GithubUserIdInfoDTO;
import com.user.repository.UserRepository;
import com.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  @PostMapping("/check")
  public ResponseEntity<Boolean> userCheck(@RequestBody GithubUserIdInfoDTO githubUserIdInfoDTO) {
    return new ResponseEntity<>(userService.userCheck(githubUserIdInfoDTO), HttpStatus.OK);
  }
}
