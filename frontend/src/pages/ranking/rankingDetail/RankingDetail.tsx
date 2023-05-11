import { addCommas } from "@/pages/code/hooks/func";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { RankingDetailBoard } from "../rankingDetailBoard/RankingDetailBoard";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import style from "./RankingDetail.module.css";
import { getRankingDetail } from "../hooks/query";
import { Pagenation } from "@/components/pagenation/Pagenation";

export const RankingDetail = () => {
  const problemInfo = {
    title: "배열 돌리기5",
    level: "14",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { id: problemId } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") ?? "1";

  const { data, isLoading } = getRankingDetail(problemId as string, page);

  console.log(data);
  // const problemInfo = {
  //   title: location.state.title,
  //   level: location.state.level,
  // };

  // const { data } = getRankingDetail();

  // console.log(data);

  // const data = [
  //   {
  //     author: "김싸피",
  //     submissionTime: "2023-04-10",
  //     language: "C++",
  //     memory: 23708,
  //     runtime: 247,
  //     refactoring: 100,
  //     codeLength: 149,
  //   },
  //   {
  //     author: "박싸피",
  //     submissionTime: "2023-04-10",
  //     language: "Java",
  //     memory: 20008,
  //     runtime: 247,
  //     refactoring: 100,
  //     codeLength: 149,
  //   },
  //   {
  //     author: "김싸피",
  //     submissionTime: "2023-04-10",
  //     language: "C++",
  //     memory: 23708,
  //     runtime: 247,
  //     refactoring: 100,
  //     codeLength: 149,
  //   },
  // ];

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
          <span>{`${problemId}. ${problemInfo.title}`}</span>
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
          <div>
            <p>{addCommas(149)}</p>
            <p>코드길이</p>
          </div>
        </div>
      </div>
      {/* <RankingDetailBoard data={data?.content} /> */}
      <Pagenation
        number={data?.number}
        first={data?.first}
        last={data?.last}
        totalPages={data?.totalPages}
        url="?page="
      />
    </div>
  );
};
