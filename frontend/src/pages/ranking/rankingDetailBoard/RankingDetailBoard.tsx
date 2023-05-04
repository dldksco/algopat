import style from "./RankingDetailBoard.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";

export const RankingDetailBoard = () => {
  const headRow = ["#", "제목", "Master", "제출한 사람 수"];
  const grid = "15% 60% 15% 10%";
  const data = [
    {
      number: "1234",
      title: "배열 돌리기 5",
      master: "김싸피",
      count: "23,111",
      isSolved: false,
    },
    {
      number: "1234",
      title: "배열 돌리기 5",
      master: "김싸피",
      count: "23,111",
      isSolved: true,
    },
    {
      number: "1234",
      title: "배열 돌리기 5",
      master: "김싸피",
      count: "23,111",
      isSolved: false,
    },
  ];

  const navigate = useNavigate();
  const rank = useRecoilValue(centerIndexState);

  return (
    <>
      {data?.map((content) => {
        return (
          <div
            key={uuidv4()}
            className={style.content_container}
            style={{ gridTemplateColumns: grid }}
            onClick={() => navigate(`detail/${content.number}`)}
          >
            <div
              className={style.row_number}
              style={{ color: content.isSolved ? "#309E61" : "" }}
            >
              <img
                src={`https://static.solved.ac/tier_small/${
                  content.isSolved ? rank : 0
                }.svg`}
                style={{ width: "1rem", height: "auto", marginRight: "10px" }}
                alt=""
              />
              {content.number}
            </div>
            <div>{content.title}</div>
            <div>{content.master}</div>
            <div>{content.count}</div>
          </div>
        );
      })}
    </>
  );
};
