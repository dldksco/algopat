import { RankingBoard } from "../rankingBoard/RankingBoard";
import { RankingCarousel } from "../rankingCarousel/RankingCarousel";
import style from "./RankingMain.module.css";

export const RankingMain = () => {
  // 더미 데이터
  const dumy1 = [
    {
      number: "1234",
      title: "배열 돌리기 5",
      author: "김싸피",
      date: "23,111",
    },
    {
      title: "1234",
      writer: "배열 돌리기 5",
      likeCount: "김싸피",
      date: "23,111",
    },
  ];

  return (
    <div className={style.RankingMain}>
      <RankingCarousel />
      <RankingBoard
        headRow={["#", "제목", "Master", "제출한 사람 수"]}
        grid="15% 60% 15% 10%"
        data={dumy1}
      />
    </div>
  );
};
