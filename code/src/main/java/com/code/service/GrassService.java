package com.code.service;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.dto.UserGrassCountRequestDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface GrassService {
  public List<DateGrassCountDTO> getGrassCount(UserGrassCountRequestDTO userGrassCountRequestDTO);
  public LocalDateTime getTodayDate();

  public LocalDateTime minusTodayDate(LocalDateTime today);
  public List<LocalDate> generateAllDatesBetween(LocalDate startDate, LocalDate endDate);
}
