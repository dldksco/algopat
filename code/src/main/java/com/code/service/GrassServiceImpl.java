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

  /**
   * 유저가 365일이내에서 푼 날짜별 문제 횟수를 리턴합니다
   * @author Lee an chae
   * @param userGrassCountRequestDTO
   * @return
   */
  @Override
  public List<DateGrassCountDTO> getGrassCount(UserGrassCountRequestDTO userGrassCountRequestDTO) {
    LocalDateTime today = getTodayDate().plusDays(1L);
    LocalDateTime todayMinusYear = today.minusMonths(12).withDayOfMonth(1);
    List<DateGrassCountDTO> dateGrossLists = userSubmitProblemRepository.findDateGrossCountByUserSeq(userGrassCountRequestDTO.getUserSeq(), today, todayMinusYear);

    List<LocalDate> allDates = generateAllDatesBetween(todayMinusYear.toLocalDate(), today.toLocalDate());
    //ex 오늘 2023-05-22라면 2022-05-01부터 2023-05-22까지 리스트를 만든 후 문제 푼 횟수들을 채워줍니다.
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

  /**
   * 오늘로부터 1년전 달의 시작일부터 오늘까지 리스트를 만들어 리턴합니다.(ex 오늘이 2023-05-22라면 2022-05-01부터 2023-05-22까지 리스트를 만들어줍니다)
   * @author Lee an chae
   * @param startDate
   * @param endDate
   * @return
   */
  @Override
  public List<LocalDate> generateAllDatesBetween(LocalDate startDate, LocalDate endDate) {
    List<LocalDate> dates = new ArrayList<>();
    for (LocalDate date = startDate; !date.isAfter(endDate.minusDays(1)); date = date.plusDays(1)) {
      dates.add(date);
    }

    return dates;
  }

  /**
   * 원하는 날짜의 푼 문제들을 리턴해줍니다
   * @author Lee an chae
   * @param userSeq
   * @param targetDate
   * @param pageable
   * @return
   */
  @Override
  public Page<DateGrassInfoDTO> findDateGrassInfo(Long userSeq, LocalDate targetDate, Pageable pageable) {
    return userSubmitProblemRepository.findDateGrassInfo(userSeq, targetDate, pageable);
  }
}
