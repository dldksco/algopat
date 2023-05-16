package com.user.controller;

import com.user.dto.BackjoonUserDTO;
import com.user.dto.GithubUserIdInfoDTO;
import com.user.dto.UserCheckResponseDTO;
import com.user.dto.UserInfo;
import com.user.dto.UserSubmitCountDTO;
import com.user.repository.UserRepository;
import com.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class UserController {
  private final UserService userService;
  @PostMapping("/check/github-id")
  public ResponseEntity<UserCheckResponseDTO> checkAndJoinGithubUser(@RequestBody GithubUserIdInfoDTO githubUserIdInfoDTO) {
    return new ResponseEntity<>(userService.checkAndJoinGithubUser(githubUserIdInfoDTO), HttpStatus.OK);
  }

  @PostMapping("/check/backjoon-id")
  public ResponseEntity<Void> checkAndJoinBackjoonUser(@RequestBody BackjoonUserDTO backjoonUserDTO) {
    userService.checkAndJoinBackjoonUser(backjoonUserDTO);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/check/user-submit-count")
  public ResponseEntity<UserSubmitCountDTO> checkUserSubmitCount(@RequestHeader("userSeq") long userSeq){
    UserSubmitCountDTO userSubmitCountDTO=userService.findUserSubmitCount(userSeq);
    log.info("userSubmitCountDTO.getUserSubmitCountCount()");
    return new ResponseEntity<>(userSubmitCountDTO,HttpStatus.OK);
  }

  @GetMapping("/profile")
  public ResponseEntity<UserInfo> userProfile(@RequestHeader("userSeq") long userSeq) {
    UserInfo userInfo = userService.userProfile(userSeq);
    return new ResponseEntity<>(userInfo, HttpStatus.OK);
  }

}
