import { addCommas } from "@/pages/code/hooks/func";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { RankingDetailBoard } from "../rankingDetailBoard/RankingDetailBoard";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import style from "./RankingDetail.module.css";

export const RankingDetail = () => {
  const dummy = {};

  const problemInfo = {
    name: "배열 돌리기5",
    level: "14",
  };

  const navigate = useNavigate();
  const { id: problemId } = useParams();

  const listClickCallback = () => navigate("/ranking");
  const problemSolveClickCallback = (problemId: string) =>
    (window.location.href = `https://www.acmicpc.net/problem/${problemId}`);

  return (
    <div className={style.ranking_detail}>
      <div className={style.header}>
        <div className={style.box} onClick={listClickCallback}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "5px" }} />
          목록
        </div>
        <div className={style.title}>
          <img
            src={`https://static.solved.ac/tier_small/${problemInfo.level}.svg`}
            style={{ width: "1.3rem", height: "auto", marginRight: "10px" }}
            alt=""
          />
          <span>{`${problemId}. ${problemInfo.name}`}</span>
        </div>
        <div
          className={style.box}
          onClick={() => problemSolveClickCallback(problemId ? problemId : "0")}
        >
          문제풀기
        </div>
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
