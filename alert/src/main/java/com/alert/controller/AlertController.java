package com.alert.controller;

import com.alert.dto.MessageDto;
import com.alert.service.EmitService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@RestController
@RequiredArgsConstructor
public class AlertController {

  // logger 정의
  private static final Logger logger = LoggerFactory.getLogger(AlertController.class);

  // service 정의
  private final EmitService emitService;

  // Sink 관리 자료구조 정의
  private final Map<Long, Many<String>> userSinks = new ConcurrentHashMap<>();
  private final Map<Long, MessageDto> userRecentResponse = new ConcurrentHashMap<>();

  // Util 정의
  private final ObjectMapper objectMapper;


  /**
   * 파이프라인 연결 -> SSE (WebFlux)
   *
   * @param userSeq
   * @return
   */
  @GetMapping(value = "/sse/{userSeq}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Mono<ResponseEntity<Flux<String>>> sseSubscription(@PathVariable long userSeq) {
    Sinks.Many<String> userSink = Sinks.many().multicast().onBackpressureBuffer();
    userSinks.put(userSeq, userSink);
//    Sinks.Many<String> userSink = userSinks.computeIfAbsent(userSeq,
//        key -> Sinks.many().multicast().onBackpressureBuffer());
    logger.info("파이프라인 연결 시작 : {}", userSeq);
    MessageDto recentResponse = userRecentResponse.get(userSeq);
    if (recentResponse != null) {
      try {
        String recentResponseJson = objectMapper.writeValueAsString(recentResponse);
        logger.info("가장 최근 로그 데이터 : " + recentResponseJson);
        userSink.tryEmitNext(recentResponseJson);
      } catch (JsonProcessingException e) {
        logger.info("가장 최근 로그 데이터가 존재하지 않습니다");
        // 아무것도 안함
      }
    }
    return Mono.just(ResponseEntity.ok().header(
            HttpHeaders.CONTENT_TYPE, MediaType.TEXT_EVENT_STREAM_VALUE + ";charset=UTF-8")
        .body(userSink.asFlux()));
    //    return Mono.just(ResponseEntity.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(userSink.asFlux()));
  }

  /**
   * GPT 응답 완료 알림 Consume
   *
   * @param message
   */
  @KafkaListener(topics = "${kafka.topic}", groupId = "${kafka.group-id}")
  public void consume(@Payload String message) {
    logger.info("알림 컨슘");
    logger.info(message);
    try {
      MessageDto messageDto = objectMapper.readValue(message, MessageDto.class);
      logger.info("변환 완료 : {}", messageDto);
      userRecentResponse.put(messageDto.getUserSeq(), messageDto);
      logger.info("사용자 알림 데이터 저장 완료 : {}", userRecentResponse.get(messageDto.getUserSeq()));
      emitService.emitMessageToUser(userSinks, messageDto);
    } catch (JsonProcessingException e) {
      logger.info("String -> Json 파싱 에러 발생");
      throw new RuntimeException(e);
    }


  }

  /**
   * Health 체크
   *
   * @return
   */
  @GetMapping("/health")
  public String healthCheck() {
    return "ok";
  }

}
