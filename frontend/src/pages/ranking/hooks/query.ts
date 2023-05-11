import { PagableResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";

interface RankingColumn {
  problemId: string;
  problemTitle: string;
  problemLevel: string;
  problemSubmittedCount: string;
  userGithubId: string;
}

interface ProblemInfo {
  problemId: string;
  problemTitle: string;
  problemLevel: string;
  problemDesc: string;
  problemInput: string;
  problemOutput: string;
  problemTag: string[];
  problemLimit: string;
  problemTimeLimit: string;
  problemSpaceLimit: string;
}

// 레벨별 문제 리스트 불러오는 쿼리
export function getRankingList(level: number, pageNum: number) {
  const { data, isLoading, refetch } = useQuery(
    ["getRankingList", level, pageNum],
    async (): Promise<PagableResponse<RankingColumn>> => {
      const { data } = await $.get(
        `/code/rank/${level}?pagenumber=${pageNum ? pageNum - 1 : ""}`
      );
      return data;
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );
  return { data, isLoading, refetch };
}

// export function getProblemInfo(problemId: string) {
//   const { data, isLoading, refetch } = useQuery(
//     ["getProblemInfo", problemId],
//     async (): Promise<PagableResponse<ProblemInfo>> => {
//       const { data } = await $.get(`/code/problem?problemid=${problemId}`);
//       return data;
//     },
//     {
//       staleTime: 5 * 60 * 1000,
//     }
//   );
//   return { data, isLoading, refetch };
// }

// 문제 번호로 랭킹 리스트 불러오는 쿼리
export function getRankingDetail(
  problemId: string,
  pagenumber: string,
  languagefilter?: string,
  sortcriteria?: string,
  defaultvalue?: string
) {
  const { data, isLoading, refetch } = useQuery(
    [
      "getRankingDetail",
      problemId,
      pagenumber,
      languagefilter,
      sortcriteria,
      defaultvalue,
    ],
    async (): Promise<PagableResponse<ProblemInfo>> => {
      const { data } = await $.get(
        `/code/rank/solutions/${problemId}?pagenumber=${pagenumber}&languagefilter=${languagefilter}&sortcriteria=&${sortcriteria}defaultvalue=${defaultvalue}`
      );
      return data;
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );
  return { data, isLoading, refetch };
}

interface IMasterUserProblemRank {
  gptSolutionSeq: number;
  userGithubId: string;
  userSubmitSolutionLanguage: string;
  userSubmitSolutionRuntime: number;
  userSubmitSolutionMemory: number;
  userSubmitSolutionCodeLength: number;
  gptTotalScore: number;
  userSubmitSolutionTime: string;
}

interface IProblemSimpInfo {
  problemLevel: number;
  problemTitle: string;
}

interface IProblemSolution {
  masterUserProblemRank: IMasterUserProblemRank;
  problemSimpInfo: IProblemSimpInfo;
  solutionCount: number;
}

// 문제 번호로 랭킹 페이지 정보 전체 조회
export function getRankPageInfo(problemId: string) {
  const { data, isLoading } = useQuery(
    ["getRankPageInfo", problemId],
    async (): Promise<IProblemSolution> => {
      const { data } = await $.get(`/code/rank/pageinfo/${problemId}`);
      return data;
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );
  return { data, isLoading };
}

// // 문제 번호로 마스터 유저 조회
// export function getMasterInfo(problemId: string) {
//   const { data, isLoading } = useQuery(
//     ["getMasterInfo", problemId],
//     async (): Promise<PagableResponse<ProblemInfo>> => {
//       const { data } = await $.get(`/code/rank/master/${problemId}`);
//       return data;
//     },
//     {
//       staleTime: 5 * 60 * 1000,
//     }
//   );
//   return { data, isLoading };
// }

// // 문제 번호로 문제 푼 사람 수 조회
// export function getRankCount(problemId: string) {
//   const { data, isLoading } = useQuery(
//     ["getRankCount", problemId],
//     async (): Promise<PagableResponse<ProblemInfo>> => {
//       const { data } = await $.get(`/code/rank/count/${problemId}`);
//       return data;
//     },
//     {
//       staleTime: 5 * 60 * 1000,
//     }
//   );
//   return { data, isLoading };
// }
