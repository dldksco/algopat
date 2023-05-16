package com.code.data.dto;


import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProblemRankDetailDto {
  private long gptSolutionSeq;
//  private String userNickname;
  private String userGithubId;
  private String userImageUrl;
  private String userSubmitSolutionLanguage;
  private long userSubmitSolutionRuntime;
  private long userSubmitSolutionMemory;
  private long userSubmitSolutionCodeLength;
  private long gptTotalScore;
  private LocalDateTime userSubmitSolutionTime;
}
