import { addCommas } from "@/pages/code/hooks/func";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { RankingDetailBoard } from "../rankingDetailBoard/RankingDetailBoard";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import style from "./RankingDetail.module.css";
import { getRankPageInfo, getRankingDetail } from "../hooks/query";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { SearchGroup } from "../rankingDetailBoard/searchGroup/SearchGroup";
import { useRecoilState, useRecoilValue } from "recoil";
import { rankingDetailState } from "@/atoms/ranking.atom";
import { RankingDetailParam } from "@/types/type";
import { useEffect } from "react";

export const RankingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: problemId } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const [rankingdetailParam, setRankingdetailParam] =
    useRecoilState(rankingDetailState);

  const { data } = getRankingDetail(rankingdetailParam);

  useEffect(() => {
    setRankingdetailParam({
      problemId: Number(problemId),
      pagenumber: page,
      defaultvalue: "",
      languagefilter: "",
      sortcriteria: "",
    });
  }, []);

  useEffect(() => {
    setRankingdetailParam((prev) => {
      return { ...prev, problemId: Number(problemId), pagenumber: page };
    });
  }, [location]);

  const { data: pageInfoData, isLoading: pageInfoLoading } = getRankPageInfo(
    Number(problemId)
  );

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
                style={{ marginBottom: "10px", textAlign: "center", cursor: "default" }}
              >
                master
              </div>
              <div className={style.user_info}>
                <div
                  style={{
                    // backgroundColor: "white",
                    backgroundImage: `url(${pageInfoData?.masterUserProblemRank.userImageUrl})`,
                    backgroundSize: "2rem 2rem",
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "100px",
                  }}
                />
                <div>{pageInfoData?.masterUserProblemRank.userGithubId}</div>
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
      <SearchGroup solutionCount={pageInfoData?.solutionCount ?? 0} />
      <RankingDetailBoard data={data?.content} />
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
