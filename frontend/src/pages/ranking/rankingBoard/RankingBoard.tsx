import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";
import { isMobile } from "@/pages/main/hooks/func";

import style from "./RankingBoard.module.css";
import { addCommas, stringCutter } from "@/pages/code/hooks/func";

/** headRow : 맨 첫번째 row에 무엇을 넣을 것인가? 제목 내용 등등등 / 안 넣으면 생성X
 *  grid : 각각의 내용들에 어느정도의 width를 할당할 것인가? 데이터 예시 ex) "40% 30% 30%"
 *  data : 말 그대로 부모에서 내려주는 데이터
 *  url : 클릭시 이동할 url
 */

interface RankingDatacolumn {
  problemId: number;
  problemTitle: string;
  problemSubmittedCount: string;
  userGithubId: string;
  problemLevel: string;
  isSolved: boolean;
}
interface props {
  data?: RankingDatacolumn[];
}

export const RankingBoard = ({ data }: props) => {
  const headRow = ["문제번호", "제목", "Master", "제출한 사람 수"];
  const grid = isMobile() ? "50% 50%" : "15% 50% 20% 15%";

  const navigate = useNavigate();
  const rank = useRecoilValue(centerIndexState);

  return (
    <>
      {headRow && (
        <div
          className={style.header_container}
          style={{
            gridTemplateColumns: grid,
            animation: "0.7s ease-in-out loadEffect2",
          }}
        >
          {headRow.map((content) => {
            return (
              <div
                key={uuidv4()}
                style={headRow.length > 4 ? { fontSize: "0.85rem" } : undefined}
              >
                {content}
              </div>
            );
          })}
        </div>
      )}
      {data?.map((content) => {
        return (
          <div
            key={uuidv4()}
            className={style.content_container}
            style={{ gridTemplateColumns: grid }}
            onClick={() => navigate(`/ranking/${content.problemId}`)}
          >
            <div
              className={style.row_number}
              style={{ color: content.isSolved ? "#309E61" : "" }}
            >
              <img
                src={`https://static.solved.ac/tier_small/${content.problemLevel}.svg`}
                style={{ width: "1rem", height: "auto", marginRight: "10px" }}
                alt=""
              />
              {content.problemId}
            </div>
            <div>{stringCutter(content.problemTitle, 20)}</div>
            <div>{content.userGithubId}</div>
            <div>{addCommas(content.problemSubmittedCount)}</div>
          </div>
        );
      })}
    </>
  );
};
