import { $ } from "@/connect/axios";
import { useQuery } from "@tanstack/react-query";

export const getSolution = (solutionSeq: number) => {
  const fetchSolution = async (): Promise<any> => {
    const { data } = await $.get(
      `/code/problem/submission/solution/detail/${solutionSeq}`
    );
    return data;
  };

  const { data, isLoading, refetch } = useQuery(
    ["GptSolution", solutionSeq],
    fetchSolution
  );

  return { data, isLoading };
};
