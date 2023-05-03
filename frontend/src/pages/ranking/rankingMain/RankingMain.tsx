import { RankingBoard } from "../rankingBoard/RankingBoard";
import { RankingCarousel } from "../rankingCarousel/RankingCarousel";
import style from "./RankingMain.module.css";

export const RankingMain = () => {
  // 더미 데이터
  return (
    <div className={style.RankingMain}>
      <RankingCarousel />
      <RankingBoard />
    </div>
  );
};
