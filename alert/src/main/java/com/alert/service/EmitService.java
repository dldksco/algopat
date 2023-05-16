package com.alert.service;

import com.alert.dto.MessageDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@Service
@RequiredArgsConstructor
public class EmitService {

  // logger 정의
  private static final Logger logger = LoggerFactory.getLogger(EmitService.class);

  // Util 정의
  private final ObjectMapper objectMapper;

  public void emitMessageToUser(Map<Long, Many<String>> userSinks, MessageDto messageDto) {

    String state        = messageDto.getState();
    long userSeq        = messageDto.getUserSeq();

    Sinks.Many<String> userSink = userSinks.get(userSeq);

    if (userSink != null) {
      try{
        String messageDtoJson = objectMapper.writeValueAsString(messageDto);
        userSink.tryEmitNext(messageDtoJson);
      } catch (JsonProcessingException e) {
        logger.error("MessageDto를 JSON으로 변환하는 중 오류 발생", e);
        userSinks.remove(userSeq); // 연결 해제
        logger.info("파이프라인 연결 종료");
      }

      if (state.equals("finish") || state.equals("error")) {
        userSinks.remove(userSeq); // 연결 해제
        logger.info("파이프라인 연결 종료");
      }
    }
  }


}
