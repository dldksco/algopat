import { RankingCarousel } from "./rankingCarousel/RankingCarousel";
import { RankingBoard } from "./rankingBoard/RankingBoard";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { useLocation, useNavigate } from "react-router-dom";
import { getRankingList, getSolvedList } from "./hooks/query";
import { useRecoilValue } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { Button } from "@/components/button/Button";
import { userInfoState } from "@/atoms/user.atom";
import style from "./Ranking.module.css";

export const Ranking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const navigate = useNavigate();

  const [clickState, setClickState] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const centerIndex = useRecoilValue(centerIndexState);
  const [prevCenterIndex, setPrevCenterIndex] = useState(centerIndex);

  useEffect(() => {
    if (prevCenterIndex !== centerIndex) {
      setPrevCenterIndex(centerIndex);
      navigate(location.pathname + "?page=1");
    }
  }, [centerIndex]);

  const level = useRecoilValue(centerIndexState);
  const { data, isLoading } = getRankingList(level, Number(page), clickState);
  const { data: solvedList } = getSolvedList();

  const solvedSet = new Set(solvedList?.problemIdList);

  const boardData = data?.content.map((v) => {
    return { ...v, isSolved: solvedSet.has(v.problemId) };
  });

  const allButtonClick = () => {
    setClickState(false);
  };

  const solvedAllButtonClick = () => {
    setClickState(true);
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
