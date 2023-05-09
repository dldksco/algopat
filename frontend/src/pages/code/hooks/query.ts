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
  timeComplexity: string | undefined;
  timeComplexityReason: string | undefined;
  timeScore: number | undefined;
  timeComplexityGoodPoint: string | undefined;
  timeComplexityBadPoint: string | undefined;
  timeComplexitySuggestion: string | undefined;
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
    Complexity: data?.gptSolutionTimeComplexity,
    ComplexityReason: data?.gptSolutionTimeComplexityReason,
    Score: data?.gptSolutionTimeScore,
    ComplexityGoodPoint: data?.gptSolutionTimeComplexityGoodPoint,
    ComplexityBadPoint: data?.gptSolutionTimeComplexityBadPoint,
    ComplexitySuggestion: data?.gptImprovingTimeComplexitySuggestion,
  };
  const spaceComplexityData = {
    Complexity: data?.gptSolutionSpaceComplexity,
    ComplexityReason: data?.gptSolutionSpaceComplexityReason,
    Score: data?.gptSolutionSpaceScore,
    ComplexityGoodPoint: data?.gptSolutionSpaceComplexityGoodPoint,
    ComplexityBadPoint: data?.gptSolutionSpaceComplexityBadPoint,
    ComplexitySuggestion: data?.gptImprovingSpaceComplexitySuggestion,
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
