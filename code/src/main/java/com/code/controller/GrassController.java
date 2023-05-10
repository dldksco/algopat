package com.code.controller;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.dto.UserGrassCountRequestDTO;
import com.code.service.GrassService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
