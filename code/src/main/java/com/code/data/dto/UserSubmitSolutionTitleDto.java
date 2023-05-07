package com.code.data.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSubmitSolutionTitleDto {
  private long submissionId;
  private LocalDateTime userSubmitSolutionTime;
}
