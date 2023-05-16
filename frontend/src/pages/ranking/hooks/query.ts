import {
  PagableResponse,
  RankingDetailParam,
  SolutionColumn,
} from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";

interface RankingColumn {
  problemId: number;
  problemTitle: string;
  problemLevel: string;
  problemSubmittedCount: string;
  userGithubId: string;
}

// 레벨별 문제 리스트 불러오는 쿼리
export function getRankingList(
  level: number,
  pageNum: number,
  usercheck: boolean
) {
  const { data, isLoading, refetch } = useQuery(
    ["getRankingList", level, pageNum, usercheck],
    async (): Promise<PagableResponse<RankingColumn>> => {
      const { data } = await $.get(
        `/code/rank?level=${
          level > 0 ? level : ""
        }&usercheck=${usercheck}&pagenumber=${pageNum ? pageNum - 1 : ""}`
      );
      return data;
    },
    {
      staleTime: 1 * 60 * 1000,
    }
  );
  return { data, isLoading, refetch };
}

// 문제 번호로 사용자 풀이 조회 (검색, 필터링, 정렬 기능 지원)
export function getRankingDetail(param: RankingDetailParam) {
  const { problemId, pagenumber, languagefilter, sortcriteria, defaultvalue } =
    param;
  const { data, isLoading, refetch } = useQuery(
    [
      "getRankingDetail",
      problemId,
      pagenumber,
      languagefilter,
      sortcriteria,
      defaultvalue,
    ],
    async (): Promise<PagableResponse<SolutionColumn>> => {
      let url = `/code/rank/solutions/${problemId}?pagenumber=${
        pagenumber - 1
      }`;

      if (languagefilter) {
        url += `&languagefilter=${languagefilter}`;
      }
      if (sortcriteria) {
        url += `&sortcriteria=${sortcriteria}`;
      }
      if (defaultvalue) {
        url += `&defaultvalue=${defaultvalue}`;
      }

      const { data } = await $.get(url);
      return data;
    },
    {
      staleTime: 1 * 60 * 1000,
    }
  );
  return { data, isLoading, refetch };
}

interface IMasterUserProblemRank {
  gptSolutionSeq: number;
  userGithubId: string;
  userImageUrl: string;
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
export function getRankPageInfo(problemId: number) {
  const { data, isLoading } = useQuery(
    ["getRankPageInfo", problemId],
    async (): Promise<IProblemSolution> => {
      const { data } = await $.get(`/code/rank/pageinfo/${problemId}`);
      return data;
    },
    {
      staleTime: 1 * 60 * 1000,
    }
  );
  return { data, isLoading };
}

// 사용자 Seq로 푼 문제 리스트 조회

interface SolvedList {
  problemIdList: number[];
}
export function getSolvedList() {
  const { data, isLoading } = useQuery(
    ["getSolvedList"],
    async (): Promise<SolvedList> => {
      if (localStorage.getItem("access-token")) {
        const { data, status } = await $.get(`/code/problem/submission/list`);
        return data;
      } else {
        return { problemIdList: [] };
      }
    },
    {
      staleTime: 1 * 60 * 1000,
    }
  );
  return { data, isLoading };
}
