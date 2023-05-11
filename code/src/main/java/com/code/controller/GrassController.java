package com.code.controller;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.dto.DateGrassInfoDTO;
import com.code.data.dto.UserGrassCountRequestDTO;
import com.code.service.GrassService;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/grass")
public class GrassController {
    private final GrassService grassService;
    @GetMapping("")
    public ResponseEntity<List<DateGrassCountDTO>> getGrassCount (@RequestHeader("userSeq") long userSeq){
        return new ResponseEntity<>(grassService.getGrassCount(UserGrassCountRequestDTO.builder()
            .userSeq(userSeq)
            .build()),HttpStatus.OK);
    }

    @GetMapping("/{targetDate}")
    public Page<DateGrassInfoDTO> getDateGrassInfo(@RequestHeader("userSeq") long userSeq, @PathVariable("targetDate") String targetDate) {
        LocalDate targetLocalDate = LocalDate.parse(targetDate, DateTimeFormatter.BASIC_ISO_DATE);
        Pageable pageable = PageRequest.of(0, 5);
        return grassService.findDateGrassInfo(userSeq, targetLocalDate, pageable);
    }
}
