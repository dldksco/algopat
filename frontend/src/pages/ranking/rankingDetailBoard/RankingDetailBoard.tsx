import { v4 as uuidv4 } from "uuid";
import { addCommas, pathColor } from "@/pages/code/hooks/func";

import style from "./RankingDetailBoard.module.css";
import { SolutionColumn } from "@/types/type";
import { codeLanguage } from "@/variable/variable";

interface props {
  data: SolutionColumn[] | undefined;
}

export const RankingDetailBoard = ({ data }: props) => {
  return (
    <>
      <div className={style.content_container}>
        {data?.map((v) => {
          return (
            <div key={uuidv4()} className={style.info}>
              <div className={style.master_info}>
                <div className={style.user_info}>
                  <div
                    style={{
                      backgroundImage: `url(${v.userImageUrl})`,
                      backgroundSize: "2rem 2rem",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "100px",
                    }}
                  />
                  <div>{v.userGithubId}</div>
                </div>
                <div>
                  제출일 :{" "}
                  {v.userSubmitSolutionTime.replace(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
                    (_, y, m, d, hh, mm, ss) =>
                      `${y}-${m}-${d} ${hh >= 12 ? "오후" : "오전"} ${
                        hh > 12 ? hh - 12 : hh
                      }:${mm}:${ss}`
                  )}
                </div>
              </div>
              <div className={style.info_list}>
                <div>
                  <p>{codeLanguage(v.userSubmitSolutionLanguage)}</p>
                  <p>언어</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{addCommas(v.userSubmitSolutionRuntime)}ms</p>
                  <p>실행시간</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{addCommas(v.userSubmitSolutionMemory)}KB</p>
                  <p>메모리</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p>{addCommas(v.userSubmitSolutionCodeLength)}</p>
                  <p>코드길이</p>
                </div>
                <div className={style.vertical_line} />
                <div>
                  <p
                    style={{
                      color: pathColor(v.gptTotalScore || 0),
                    }}
                  >
                    {v.gptTotalScore}점
                  </p>
                  <p>종합점수</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
