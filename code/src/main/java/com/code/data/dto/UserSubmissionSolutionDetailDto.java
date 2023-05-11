package com.code.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSubmissionSolutionDetailDto {
  private String userSubmitSolutionResult;
  private String userSubmitSolutionResultCategory; // Todo : List 타입으로 변환
  private String userSubmitSolutionLanguage;
  private String userSubmitSolutionCode;
  private long userSubmitSolutionRuntime;
  private long userSubmitSolutionMemory;

  private String gptSolutionTimeComplexity;
  private String gptSolutionTimeComplexityReason;
  private long gptSolutionTimeScore;
  private String gptSolutionTimeComplexityGoodPoint;
  private String gptSolutionTimeComplexityBadPoint;
  private String gptImprovingTimeComplexitySuggestion;
  private String gptSolutionSpaceComplexity;
  private String gptSolutionSpaceComplexityReason;
  private long gptSolutionSpaceScore;
  private String gptSolutionSpaceComplexityGoodPoint;
  private String gptSolutionSpaceComplexityBadPoint;
  private String gptImprovingSpaceComplexitySuggestion;
  private long gptSolutionCleanScore;
  private String gptSolutionRefactoringSuggestion;
  private long gptTotalScore;

}
