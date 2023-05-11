import { addCommas } from "@/pages/code/hooks/func";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { RankingDetailBoard } from "../rankingDetailBoard/RankingDetailBoard";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import style from "./RankingDetail.module.css";
import { getRankPageInfo, getRankingDetail } from "../hooks/query";
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

  // const { data, isLoading } = getRankingDetail(problemId as string, page);

  const { data: pageInfoData, isLoading: pageInfoLoading } = getRankPageInfo(
    problemId as string
  );

  console.log(pageInfoData);

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
            src={`https://static.solved.ac/tier_small/${pageInfoData?.problemSimpInfo.problemLevel}.svg`}
            style={{ width: "1.3rem", height: "auto", marginRight: "10px" }}
            alt=""
          />
          <span>{`${problemId}. ${pageInfoData?.problemSimpInfo.problemTitle}`}</span>
        </div>
        <div
          className={style.box}
          onClick={() => problemSolveClickCallback(problemId ? problemId : "0")}
        >
          문제풀기
        </div>
      </div>
      <div className={style.info + " " + style.box}>
        {!pageInfoLoading && (
          <>
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
                <div>{pageInfoData?.masterUserProblemRank.userGithubId}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                {pageInfoData?.masterUserProblemRank.userSubmitSolutionTime}
              </div>
            </div>
            <div className={style.info_list}>
              <div>
                <p>
                  {
                    pageInfoData?.masterUserProblemRank
                      .userSubmitSolutionLanguage
                  }
                </p>
                <p>언어</p>
              </div>
              <div className={style.vertical_line} />
              <div>
                <p>
                  {addCommas(
                    pageInfoData?.masterUserProblemRank
                      .userSubmitSolutionRuntime
                  )}
                  ms
                </p>
                <p>실행시간</p>
              </div>
              <div className={style.vertical_line} />
              <div>
                <p>
                  {addCommas(
                    pageInfoData?.masterUserProblemRank.userSubmitSolutionMemory
                  )}
                  KB
                </p>
                <p>메모리</p>
              </div>
              <div className={style.vertical_line} />
              <div>
                <p>{pageInfoData?.masterUserProblemRank.gptTotalScore}점</p>
                <p>리팩토링</p>
              </div>
              <div className={style.vertical_line} />
              <div>
                <p>
                  {addCommas(
                    pageInfoData?.masterUserProblemRank
                      .userSubmitSolutionCodeLength
                  )}
                </p>
                <p>코드길이</p>
              </div>
            </div>
          </>
        )}
      </div>
      <RankingDetailBoard
        data={[]}
        solutionCount={pageInfoData?.solutionCount ?? 0}
      />
      {/* <Pagenation
        number={data?.number}
        first={data?.first}
        last={data?.last}
        totalPages={data?.totalPages}
        url="?page="
      /> */}
    </div>
  );
};
