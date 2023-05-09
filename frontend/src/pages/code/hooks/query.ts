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

export const getSolution = (solutionSeq: number) => {
  const fetchSolution = async (): Promise<any> => {
    const { data } = await $.get(
      `/code/problem/submission/solution/detail/${solutionSeq}`
    );
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["GptSolution", solutionSeq],
    fetchSolution
  );

  const refactoringData = {};
  const timeComplexityData = "";
  const spaceComplexityData = "";

  return { data, isLoading, isError, refetch };
};
