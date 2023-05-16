package com.code.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSubmitTransactionDto {
    @Builder.Default
    String isSuccess ="YES";
    long userSeq;

    String openaiApiKey;
}
