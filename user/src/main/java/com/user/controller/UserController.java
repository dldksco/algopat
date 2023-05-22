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

  /**
   * github id를 통해 userSeq를 리턴해줍니다
   * @author Lee an chae
   * @param githubUserIdInfoDTO
   * @return
   */
  @PostMapping("/check/github-id")
  public ResponseEntity<UserCheckResponseDTO> checkAndJoinGithubUser(@RequestBody GithubUserIdInfoDTO githubUserIdInfoDTO) {
    return new ResponseEntity<>(userService.checkAndJoinGithubUser(githubUserIdInfoDTO), HttpStatus.OK);
  }

  /**
   * 백준 아이디가 서비스에 가입되었는지 확인하고 가입하지 않았을 시 가입시킵니다.
   * @author Lee an chae
   * @param backjoonUserDTO
   * @return
   */
  @PostMapping("/check/backjoon-id")
  public ResponseEntity<Void> checkAndJoinBackjoonUser(@RequestBody BackjoonUserDTO backjoonUserDTO) {
    userService.checkAndJoinBackjoonUser(backjoonUserDTO);
    return ResponseEntity.ok().build();
  }

  /**
   * User 제출 횟수가 몇 회 남았는지 알려줍니다
   * @author Lee an chae
   * @param userSeq
   * @return
   */
  @GetMapping("/check/user-submit-count")
  public ResponseEntity<UserSubmitCountDTO> checkUserSubmitCount(@RequestHeader("userSeq") long userSeq){
    UserSubmitCountDTO userSubmitCountDTO=userService.findUserSubmitCount(userSeq);
    log.info("userSubmitCountDTO.getUserSubmitCountCount()");
    return new ResponseEntity<>(userSubmitCountDTO,HttpStatus.OK);
  }

  /**
   * 유저 프로필 정보를 반환합니다
   * @author Lee an chae
   * @param userSeq
   * @return
   */
  @GetMapping("/profile")
  public ResponseEntity<UserInfo> userProfile(@RequestHeader("userSeq") long userSeq) {
    UserInfo userInfo = userService.userProfile(userSeq);
    return new ResponseEntity<>(userInfo, HttpStatus.OK);
  }

}
