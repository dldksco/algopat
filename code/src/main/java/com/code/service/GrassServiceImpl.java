package com.code.service;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.dto.DateGrassInfoDTO;
import com.code.data.dto.UserGrassCountRequestDTO;
import com.code.data.repository.UserSubmitProblemRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GrassServiceImpl implements GrassService {
  private final UserSubmitProblemRepository userSubmitProblemRepository;

  @Override
  public List<DateGrassCountDTO> getGrassCount(UserGrassCountRequestDTO userGrassCountRequestDTO) {
    LocalDateTime today = getTodayDate();
    LocalDateTime todayMinusYear = today.minusMonths(12).withDayOfMonth(1);
    List<DateGrassCountDTO> dateGrossLists = userSubmitProblemRepository.findDateGrossCountByUserSeq(userGrassCountRequestDTO.getUserSeq(), today, todayMinusYear);

    List<LocalDate> allDates = generateAllDatesBetween(todayMinusYear.toLocalDate(), today.toLocalDate());
    Map<LocalDate, Long> solvedCountByDate = dateGrossLists.stream().collect(
        Collectors.toMap(DateGrassCountDTO::getUserSubmitProblemCreatedAt, DateGrassCountDTO::getSolvedCount));

    List<DateGrassCountDTO> result = new ArrayList<>();
    for (LocalDate date : allDates) {
      Long solvedCount = solvedCountByDate.getOrDefault(date, 0L);
      result.add(new DateGrassCountDTO(date, solvedCount));
    }

    return result;
  }

  @Override
  public LocalDateTime getTodayDate() {
    return LocalDateTime.now().truncatedTo(ChronoUnit.DAYS);
  }
  @Override
  public LocalDateTime minusTodayDate(LocalDateTime today){

    return today.minusMonths(12).withDayOfMonth(1);
  }
  @Override
  public List<LocalDate> generateAllDatesBetween(LocalDate startDate, LocalDate endDate) {
    List<LocalDate> dates = new ArrayList<>();
    for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
      dates.add(date);
    }
    return dates;
  }
@Override
  public Page<DateGrassInfoDTO> findDateGrassInfo(Long userSeq, LocalDate targetDate, Pageable pageable) {
    return userSubmitProblemRepository.findDateGrassInfo(userSeq, targetDate, pageable);
  }
}
