import { addCommas } from "@/pages/code/hooks/func";
import style from "./RankingDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { RankingDetailBoard } from "../rankingDetailBoard/RankingDetailBoard";
import { Pagenation } from "@/components/pagenation/Pagenation";

export const RankingDetail = () => {
  const dummy = {};

  return (
    <div className={style.ranking_detail}>
      <div className={style.header}>
        <div className={style.box}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "5px" }} />
          목록
        </div>
        <div className={style.title}>
          <img
            src={`https://static.solved.ac/tier_small/1.svg`}
            style={{ width: "1.3rem", height: "auto", marginRight: "10px" }}
            alt=""
          />
          <span>9614. 다채로운 구간</span>
        </div>
        <div className={style.box}>문제풀기</div>
      </div>
      <div className={style.info + " " + style.box}>
        <div className={style.master_info}>
          <div
            className={style.box}
            style={{ marginBottom: "10px", textAlign: "center" }}
          >
            master
          </div>
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
        </div>
        <div className={style.info_list}>
          <div>
            <p>{addCommas(1270)}</p>
            <p>제출자</p>
          </div>
          <div className={style.vertical_line} />
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
          <div className={style.box}>
            <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: "5px" }} />
            12
          </div>
        </div>
      </div>
      <RankingDetailBoard />
    </div>
  );
};
