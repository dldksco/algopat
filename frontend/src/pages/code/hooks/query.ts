import axios from "axios";
import { $ } from "@/connect/axios";
import { PagableResponse } from "@/types/type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface Solution {
  userSubmitSolutionResult: string;
  userSubmitSolutionResultCategory: string;
  userSubmitSolutionLanguage: string;
  userSubmitSolutionCode: string;
  userSubmitSolutionRuntime: number;
  userSubmitSolutionMemory: number;
  gptSolutionTimeComplexity: string;
  gptSolutionTimeComplexityReason: string;
  gptSolutionTimeScore: number;
  gptSolutionTimeComplexityGoodPoint: string;
  gptSolutionTimeComplexityBadPoint: string;
  gptImprovingTimeComplexitySuggestion: string;
  gptSolutionSpaceComplexity: string;
  gptSolutionSpaceComplexityReason: string;
  gptSolutionSpaceScore: number;
  gptSolutionSpaceComplexityGoodPoint: string;
  gptSolutionSpaceComplexityBadPoint: string;
  gptImprovingSpaceComplexitySuggestion: string;
  gptSolutionCleanScore: number;
  gptSolutionRefactoringSuggestion: string;
  gptTotalScore: number;
}

export interface RefactoringData {
  language: string | undefined;
  submitCode: string | undefined;
  cleanScore: number | undefined;
  refactoringSuggestion: string | undefined;
}

export interface ComplexityData {
  complexity: string | undefined;
  complexityReason: string | undefined;
  score: number | undefined;
  complexityGoodPoint: string | undefined;
  complexityBadPoint: string | undefined;
  complexitySuggestion: string | undefined;
  solutionRuntime?: number | undefined;
  solutionMemory?: number | undefined;
}

export interface TotalInfo {
  gptTotalScore: number | undefined;
  solutionRuntime: number | undefined;
  solutionMemory: number | undefined;
}

/**
 * 선택한 문제에 대한 상세한 코드 리뷰를 불러오는 함수
 */
export const getSolution = (solutionSeq: number, token: string) => {
  const fetchSolution = async (): Promise<Solution> => {
    const { data } = await $.get(
      `/code/problem/submission/solution/detail/${solutionSeq}`
    );
    return data;
  };

  const fetchForExtension = async (): Promise<Solution> => {
    const { data } = await axios.get(
      `https://algopat.kr/api/code/problem/submission/solution/detail/${solutionSeq}`,
      {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["GptSolution", solutionSeq],
    token ? fetchForExtension : fetchSolution,
    { enabled: !!solutionSeq }
  );

  const refactoringData = {
    language: data?.userSubmitSolutionLanguage,
    submitCode: data?.userSubmitSolutionCode,
    cleanScore: data?.gptSolutionCleanScore,
    refactoringSuggestion: data?.gptSolutionRefactoringSuggestion,
  };
  const timeComplexityData = {
    complexity: data?.gptSolutionTimeComplexity,
    complexityReason: data?.gptSolutionTimeComplexityReason,
    score: data?.gptSolutionTimeScore,
    complexityGoodPoint: data?.gptSolutionTimeComplexityGoodPoint,
    complexityBadPoint: data?.gptSolutionTimeComplexityBadPoint,
    complexitySuggestion: data?.gptImprovingTimeComplexitySuggestion,
    solutionRuntime: data?.userSubmitSolutionRuntime,
  };
  const spaceComplexityData = {
    complexity: data?.gptSolutionSpaceComplexity,
    complexityReason: data?.gptSolutionSpaceComplexityReason,
    score: data?.gptSolutionSpaceScore,
    complexityGoodPoint: data?.gptSolutionSpaceComplexityGoodPoint,
    complexityBadPoint: data?.gptSolutionSpaceComplexityBadPoint,
    complexitySuggestion: data?.gptImprovingSpaceComplexitySuggestion,
    solutionMemory: data?.userSubmitSolutionMemory,
  };

  const totalInfo = {
    gptTotalScore: data?.gptTotalScore,
    solutionRuntime: data?.userSubmitSolutionRuntime,
    solutionMemory: data?.userSubmitSolutionMemory,
  };

  return {
    refactoringData,
    timeComplexityData,
    spaceComplexityData,
    totalInfo,
    isLoading,
    isError,
    refetch,
  };
};

/******************************/

export interface ProblemInfo {
  problemId: number;
  problemLevel: number;
  problemTitle: string;
}

/**
 * 제출한 문제들의 Infinity Query를 불러오는 함수
 */
export const getInfinityProblemList = (category: string, condition: string) => {
  const fetchData = async (
    page: number,
    category: string,
    condition: string
  ): Promise<PagableResponse<ProblemInfo>> => {
    const response = await $.get(
      `/code/problem/submission/sort/${page}?category=${category}&condition=${condition}`
    ).then((res) => res.data);
    return response;
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["infinityProblemList", category, condition],
      ({ pageParam = 0 }) => fetchData(pageParam, category, condition),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.last) return undefined;
          else return lastPage.number + 1;
        },
      }
    );

  return { data, fetchNextPage, isFetchingNextPage, hasNextPage };
};

/******************************/

export interface Solve {
  submissionId: number;
  userSubmitSolutionTime: string;
}

/**
 * 특정 문제에 대한 제출 리스트를 불러오는 함수
 */
export const getSubmissionList = (
  problemId: number,
  isProblemOpen: boolean
) => {
  const fetchSubmission = async (): Promise<PagableResponse<Solve>> => {
    const response = await $.get(
      `/code/problem/submission/solution/${problemId}/0`
    ).then((res) => res.data);
    return response;
  };

  const { data, isLoading } = useQuery(
    ["problemDetail", problemId],
    fetchSubmission,
    {
      enabled: !!isProblemOpen,
    }
  );

  return { data, isLoading };
};

/******************************/

/**
 * 문제 정보 조회
 */

interface Problem {
  problemId: string;
  problemTitle: string;
  problemLevel: string;
  problemDesc: string;
  problemInput: string;
  problemOutput: string;
  problemTagList: string[];
  problemLimit: number;
  problemTimeLimit: number;
  problemSpaceLimit: number;
}

export const getProblemInfo = (problemId: number) => {
  const fetchSubmission = async (): Promise<Problem> => {
    const response = await $.get(`/code/problem?problemId=${problemId}`).then(
      (res) => res.data
    );
    return response;
  };

  const { data, isLoading } = useQuery(
    ["getProblemInfo", problemId],
    fetchSubmission,
    {
      enabled: problemId == 0 ? false : true,
    }
  );

  return { data, isLoading };
};

/******************************/
