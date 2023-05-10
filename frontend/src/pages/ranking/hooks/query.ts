import { PagableResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";

interface Problem {
  problemId: string;
  problemTitle: string;
  problemLevel: string;
  problemSubmittedCount: string;
  userGithubId: string;
}

export function getRankingList(level: number, pageNum: number) {
  const { data, isLoading, refetch } = useQuery(
    ["getRankingList", level, pageNum],
    async (): Promise<PagableResponse<Problem>> => {
      const { data } = await $.get(
        `/code/rank/${level}?pageNumber=${pageNum ? pageNum - 1 : ""}`
      );
      return data;
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );
  return { data, isLoading, refetch };
}
