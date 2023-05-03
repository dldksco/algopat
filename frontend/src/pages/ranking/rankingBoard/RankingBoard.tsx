import style from "./RankingBoard.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/atoms/user.atom";
import { stringCutter } from "@/pages/code/hooks/func";

/** headRow : 맨 첫번째 row에 무엇을 넣을 것인가? 제목 내용 등등등 / 안 넣으면 생성X
 *  grid : 각각의 내용들에 어느정도의 width를 할당할 것인가? 데이터 예시 ex) "40% 30% 30%"
 *  data : 말 그대로 부모에서 내려주는 데이터
 *  url : 클릭시 이동할 url
 */

interface RankingBoardProps {
  headRow?: string[];
  grid: string;
  data?: any[];
  url?: string;
  color?: string;
}

export const RankingBoard = ({
  headRow,
  grid,
  data,
  url,
  color,
}: RankingBoardProps) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);

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
            onClick={() => {
              url
                ? navigate(url + `${content.alertSeq || content.noticeSeq}`)
                : undefined;
            }}
          >
            <div style={{ color: `${color}` }}>
              {stringCutter(content.title, 30)}
            </div>
            <div style={{ color: `${color}` }}>{content.writer}</div>
            <div style={{ color: `${color}` }}>{content.likeCount}</div>
            <div style={{ color: `${color}` }}>{content.date}</div>
          </div>
        );
      })}
    </>
  );
};
