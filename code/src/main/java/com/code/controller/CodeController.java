package com.code.controller;

import com.code.data.dto.ProblemDto;
import com.code.service.KafkaProducerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodeController {

  private final String USER_CODE_TOPIC = "usercode";

  // Service 정의
  private final KafkaProducerService kafkaProducerService;

  @PostMapping("/usercode")
  public String sendToUsercode(@RequestBody ProblemDto problemDto)
      throws JsonProcessingException {
    System.out.println(problemDto.toString());
    kafkaProducerService.send(USER_CODE_TOPIC, problemDto);
    return "ok";
  }



}
