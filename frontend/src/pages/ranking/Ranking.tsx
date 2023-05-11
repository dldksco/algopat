import { RankingCarousel } from "./rankingCarousel/RankingCarousel";
import { RankingBoard } from "./rankingBoard/RankingBoard";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { useLocation } from "react-router-dom";

import style from "./Ranking.module.css";
import { getRankingList, getSolvedList } from "./hooks/query";
import { useRecoilValue } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";

export const Ranking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") ? searchParams.get("page") : "1";

  const level = useRecoilValue(centerIndexState);
  const { data, isLoading } = getRankingList(level + 1, Number(page));
  const { data: solvedList } = getSolvedList();

  const solvedSet = new Set(solvedList?.problemIdList);

  const boardData = data?.content.map((v) => {
    return { ...v, isSolved: solvedSet.has(v.problemId) };
  });

  return (
    <>
      <div className={style.RankingMain}>
        <RankingCarousel />
        {!isLoading ? (
          <>
            <RankingBoard data={boardData} />
            <Pagenation
              number={data?.number}
              first={data?.first}
              last={data?.last}
              totalPages={data?.totalPages}
              url="?page="
            />
          </>
        ) : (
          <>
            <LoadingSpinner />
          </>
        )}
      </div>
    </>
  );
};
