package com.code.service;

import com.code.data.dto.DateGrassCountDTO;
import com.code.data.dto.DateGrassInfoDTO;
import com.code.data.dto.UserGrassCountRequestDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GrassService {
  /**
   * 유저가 365일이내에서 푼 날짜별 문제 횟수를 리턴합니다
   * @author Lee an chae
   * @param userGrassCountRequestDTO
   * @return
   */
  public List<DateGrassCountDTO> getGrassCount(UserGrassCountRequestDTO userGrassCountRequestDTO);
  public LocalDateTime getTodayDate();

  public LocalDateTime minusTodayDate(LocalDateTime today);
  /**
   * 오늘로부터 1년전 달의 시작일부터 오늘까지 리스트를 만들어 리턴합니다.(ex 오늘이 2023-05-22라면 2022-05-01부터 2023-05-22까지 리스트를 만들어줍니다)
   * @author Lee an chae
   * @param startDate
   * @param endDate
   * @return
   */
  public List<LocalDate> generateAllDatesBetween(LocalDate startDate, LocalDate endDate);

  /**
   * 원하는 날짜의 푼 문제들을 리턴해줍니다
   * @author Lee an chae
   * @param userSeq
   * @param targetDate
   * @param pageable
   * @return
   */
  public Page<DateGrassInfoDTO> findDateGrassInfo(Long userSeq, LocalDate targetDate, Pageable pageable) ;

}
