package com.code.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProblemRequestDto {

  @NotBlank
  @JsonProperty("openai_api_key")
  private String openaiApiKey;

  @NotBlank
  @JsonProperty("elementId")
  private String elementId;

  @NotBlank
  @JsonProperty("submissionId")
  private String submissionId;

  @NotNull
  @JsonProperty("username")
  private String username;

  @NotBlank
  @JsonProperty("problemId")
  private String problemId;

  @NotNull
  @JsonProperty("result")
  private String result;

  @NotNull
  @JsonProperty("memory")
  private String memory;

  @NotNull
  @JsonProperty("runtime")
  private String runtime;

  @NotNull
  @JsonProperty("language")
  private String language;

  @NotNull
  @JsonProperty("codeLength")
  private String codeLength;

  @NotNull
  @JsonProperty("submissionTime")
  private String submissionTime;

  @NotNull
  @JsonProperty("resultCategory")
  private String resultCategory;

  @NotNull
  @JsonProperty("title")
  private String title;

  @NotNull
  @JsonProperty("level")
  private String level;

  @NotNull
  @JsonProperty("code")
  private String code;

  @NotNull
  @JsonProperty("problem_description")
  private String problemDescription;

  @NotNull
  @JsonProperty("problem_input")
  private String problemInput;

  @NotNull
  @JsonProperty("problem_output")
  private String problemOutput;

  @NotNull
  @JsonProperty("problem_tags")
  private List<String> problemTags;

  @NotNull
  @JsonProperty("problem_limit")
  private List<String> problemLimit;

  @NotNull
  @JsonProperty("problem_info_space_limit")
  private String problemInfoSpaceLimit;

  @NotNull
  @JsonProperty("problem_info_time_limit")
  private String problemInfoTimeLimit;

  @NotNull
  @JsonProperty("userSeq")
  private String userSeq;

}
