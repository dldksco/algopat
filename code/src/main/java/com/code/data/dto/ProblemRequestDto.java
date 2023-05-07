package com.code.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;
import lombok.ToString;

@Data
public class ProblemRequestDto {

  @JsonProperty("openai_api_key")
  private String openaiApiKey;

  @JsonProperty("elementId")
  private String elementId;

  @JsonProperty("submissionId")
  private String submissionId;

  @JsonProperty("username")
  private String username;

  @JsonProperty("problemId")
  private String problemId;

  @JsonProperty("result")
  private String result;

  @JsonProperty("memory")
  private String memory;

  @JsonProperty("runtime")
  private String runtime;

  @JsonProperty("language")
  private String language;

  @JsonProperty("codeLength")
  private String codeLength;

  @JsonProperty("submissionTime")
  private String submissionTime;

  @JsonProperty("resultCategory")
  private String resultCategory;

  @JsonProperty("title")
  private String title;

  @JsonProperty("level")
  private String level;

  @JsonProperty("code")
  private String code;

  @JsonProperty("problem_description")
  private String problemDescription;

  @JsonProperty("problem_input")
  private String problemInput;

  @JsonProperty("problem_output")
  private String problemOutput;

  @JsonProperty("problem_tags")
  private List<String> problemTags;

  @JsonProperty("problem_limit")
  private List<String> problemLimit;

  @JsonProperty("problem_info_space_limit")
  private String problemInfoSpaceLimit;

  @JsonProperty("problem_info_time_limit")
  private String problemInfoTimeLimit;

}
