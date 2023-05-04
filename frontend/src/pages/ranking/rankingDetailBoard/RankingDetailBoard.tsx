import style from "./RankingDetailBoard.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValue } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";
import { addCommas } from "@/pages/code/hooks/func";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Pagenation } from "@/components/pagenation/Pagenation";

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
      <div className={style.content_container}>
        {data?.map((content) => {
          return (
            <div
              key={uuidv4()}
              className={style.info}
              style={{ gridTemplateColumns: grid }}
            >
              <div className={style.master_info}>
                <div className={style.user_info}>
                  <div
                    style={{
                      backgroundColor: "white",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "100px",
                    }}
                  />
                  <div>김싸피</div>
                </div>
                <div>제출일 : 2023-04-10</div>
              </div>
              <div className={style.info_list}>
                <div>
                  <p>C++</p>
                  <p>언어</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{addCommas(247)}ms</p>
                  <p>실행시간</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{addCommas(23708)}KB</p>
                  <p>메모리</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{100}점</p>
                  <p>리팩토링</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{749}</p>
                  <p>코드길이</p>
                </div>
              </div>
            </div>
          );
        })}
        <Pagenation first={true} last={true} />
      </div>
    </>
  );
};
