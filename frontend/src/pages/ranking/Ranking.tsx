import { RankingCarousel } from "./rankingCarousel/RankingCarousel";
import { RankingBoard } from "./rankingBoard/RankingBoard";
import { Pagenation } from "@/components/pagenation/Pagenation";

import style from "./Ranking.module.css";

export const Ranking = () => {
  return (
    <>
      <div className={style.RankingMain}>
        <RankingCarousel />
        <RankingBoard />
        <Pagenation first={true} last={true} />
      </div>
    </>
  );
};
