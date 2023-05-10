import { $ } from "@/connect/axios";
import { useQuery } from "@tanstack/react-query";

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

export const getSolution = (solutionSeq: number) => {
  const fetchSolution = async (): Promise<Solution> => {
    const { data } = await $.get(
      `/code/problem/submission/solution/detail/${solutionSeq}`
    );
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["GptSolution", solutionSeq],
    fetchSolution,
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
