import { RankingCarousel } from "./rankingCarousel/RankingCarousel";
import { RankingBoard } from "./rankingBoard/RankingBoard";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { useLocation } from "react-router-dom";

import style from "./Ranking.module.css";
import { getRankingList, getSolvedList } from "./hooks/query";
import { useRecoilValue } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { Button } from "@/components/button/Button";
import { userInfoState } from "@/atoms/user.atom";

export const Ranking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const page = searchParams.get("page") ? searchParams.get("page") : "1";

  const [clickState, setClickState] = useState(false);
  const [page, setPage] = useState(1);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    setPage(searchParams.get("page") ? Number(searchParams.get("page")) : 1);
  }, [page]);

  const level = useRecoilValue(centerIndexState);
  const { data, isLoading } = getRankingList(level, page, clickState);
  const { data: solvedList } = getSolvedList();

  const solvedSet = new Set(solvedList?.problemIdList);

  const boardData = data?.content.map((v) => {
    return { ...v, isSolved: solvedSet.has(v.problemId) };
  });

  const allButtonClick = () => {
    setClickState(false);
    setPage(1);
  };

  const solvedAllButtonClick = () => {
    setClickState(true);
    setPage(1);
  };

  return (
    <>
      <div className={style.RankingMain}>
        <RankingCarousel />
        {userInfo.userSeq > 0 ? (
          <div style={{ padding: "10px" }}>
            <Button
              style={
                clickState
                  ? { marginRight: "5px" }
                  : {
                      marginRight: "5px",
                      color: "skyblue",
                      borderColor: "skyblue",
                    }
              }
              content="전체보기"
              onClick={allButtonClick}
            />
            <Button
              style={
                clickState ? { color: "skyblue", borderColor: "skyblue" } : {}
              }
              content="내가 푼 문제 보기"
              onClick={solvedAllButtonClick}
            />
          </div>
        ) : (
          <></>
        )}

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
            <LoadingSpinner customStyle={{ height: "100px" }} />
          </>
        )}
      </div>
    </>
  );
};
