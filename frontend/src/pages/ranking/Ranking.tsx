import { RankingCarousel } from "./rankingCarousel/RankingCarousel";
import { RankingBoard } from "./rankingBoard/RankingBoard";

import style from "./Ranking.module.css";

export const Ranking = () => {
  return (
    <>
      <div className={style.RankingMain}>
        <RankingCarousel />
        <RankingBoard />
      </div>
    </>
  );
};
