import { useRecoilValue } from "recoil";
import {
  nowProblemSubmissionIdState,
  toekenForDetailState,
} from "@/atoms/code.atom";
import CodeBox from "../codeBox/CodeBox";
import { getSolution } from "../hooks/query";
import style from "./CodeDetail.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  addCommas,
  backgroundColor,
  pathColor,
  stringCutter,
} from "../hooks/func";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { CSSProperties } from "react";
import { isMobile } from "@/pages/main/hooks/func";

export const CodeDetail = () => {
  const nowProblem = useRecoilValue(nowProblemSubmissionIdState);
  const token = useRecoilValue(toekenForDetailState);
  const problem = useRecoilValue(nowProblemSubmissionIdState);

  const {
    refactoringData,
    timeComplexityData,
    spaceComplexityData,
    totalInfo,
  } = getSolution(nowProblem.submissionId, token);
  const circleStyle: CSSProperties = { width: "9%", textAlign: "center" };

  return (
    <div className={style.code_detail}>
      {!nowProblem.submissionId ? (
        <div className={style.algopat}>ALGOPAT</div>
      ) : nowProblem.nowProcess ? (
        <div className={style.algopat} style={{ marginTop: "0px" }}>
          <LoadingSpinner />
          현재 GPT 응답을 처리중입니다.
        </div>
      ) : (
        <>
          <div className={style.circles}>
            <div style={circleStyle}>
              <CircularProgressbar
                value={totalInfo?.gptTotalScore || 0}
                text={`${totalInfo?.gptTotalScore || 0}%`}
                background={true}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: pathColor(totalInfo?.gptTotalScore || 0),
                  textColor: pathColor(totalInfo?.gptTotalScore || 0),
                  trailColor: "#2d3970",
                  backgroundColor: backgroundColor(
                    totalInfo?.gptTotalScore || 0
                  ),
                })}
              />
              <h3>종합 점수</h3>
            </div>
            <div style={circleStyle}>
              <CircularProgressbar
                value={timeComplexityData?.score || 0}
                text={`${timeComplexityData?.score || 0}%`}
                background={true}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: pathColor(timeComplexityData?.score || 0),
                  textColor: pathColor(timeComplexityData?.score || 0),
                  trailColor: "#2d3970",
                  backgroundColor: backgroundColor(
                    timeComplexityData?.score || 0
                  ),
                })}
              />
              <h3>시간 복잡도</h3>
            </div>
            <div style={circleStyle}>
              <CircularProgressbar
                value={spaceComplexityData?.score || 0}
                text={`${spaceComplexityData?.score || 0}%`}
                background={true}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: pathColor(spaceComplexityData?.score || 0),
                  textColor: pathColor(spaceComplexityData?.score || 0),
                  trailColor: "#2d3970",
                  backgroundColor: backgroundColor(
                    spaceComplexityData?.score || 0
                  ),
                })}
              />
              <h3>공간 복잡도</h3>
            </div>
            <div style={circleStyle}>
              <CircularProgressbar
                value={refactoringData?.cleanScore || 0}
                text={`${refactoringData?.cleanScore || 0}%`}
                background={true}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: pathColor(refactoringData?.cleanScore || 0),
                  textColor: pathColor(refactoringData?.cleanScore || 0),
                  trailColor: "#2d3970",
                  backgroundColor: backgroundColor(
                    refactoringData?.cleanScore || 0
                  ),
                })}
              />
              <h3>클린 코드</h3>
            </div>
          </div>
          <hr color="gray" />
          <div className={style.info_box}>
            <div className={style.total_score}>
              <div style={{ width: "70%" }}>
                <CircularProgressbar
                  value={totalInfo?.gptTotalScore || 0}
                  text={`${totalInfo?.gptTotalScore || 0}%`}
                  background={true}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: pathColor(totalInfo?.gptTotalScore || 0),
                    textColor: pathColor(totalInfo?.gptTotalScore || 0),
                    trailColor: "#2d3970",
                    backgroundColor: backgroundColor(
                      totalInfo?.gptTotalScore || 0
                    ),
                  })}
                />
              </div>

              <h2>종합 점수</h2>
              <div className={style.score_board}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      className={style.circle}
                      style={{
                        backgroundColor: `${pathColor(10)}`,
                      }}
                    />
                    <span>낮은 점수</span>
                  </div>
                  <p
                    style={{
                      color: `${pathColor(10)}`,
                    }}
                  >
                    0 ~ 39
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      className={style.circle}
                      style={{
                        backgroundColor: `${pathColor(50)}`,
                      }}
                    />
                    <span>중간 점수</span>
                  </div>
                  <p
                    style={{
                      color: `${pathColor(50)}`,
                    }}
                  >
                    40 ~ 79
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      className={style.circle}
                      style={{
                        backgroundColor: `${pathColor(100)}`,
                      }}
                    />
                    <span>높은 점수</span>
                  </div>
                  <p
                    style={{
                      color: `${pathColor(100)}`,
                    }}
                  >
                    80 ~ 100
                  </p>
                </div>
              </div>
            </div>
            <div className={style.right_box}>
              <span>Problem</span>
              <div className={style.right_box_box}>
                <div className={style.problem_list}>
                  <img
                    src={`https://static.solved.ac/tier_small/${problem.problemLevel}.svg`}
                    alt={problem.problemTitle}
                  />
                  {stringCutter(
                    problem.problemId + ". " + problem.problemTitle,
                    isMobile() ? 15 : 21
                  )}
                </div>
              </div>
              <span>Result</span>
              <div id={style.data} className={style.right_box_box}>
                <div>
                  <div>
                    <div
                      className={style.circle}
                      style={{
                        backgroundColor: `${pathColor(
                          timeComplexityData.score || 0
                        )}`,
                      }}
                    />
                    <span>시간 복잡도</span>
                    <h3
                      style={{
                        color: `${pathColor(timeComplexityData.score || 0)}`,
                      }}
                    >
                      {addCommas(timeComplexityData.solutionRuntime || 0)} ms
                    </h3>
                  </div>
                </div>

                <div>
                  <div>
                    <div
                      className={style.circle}
                      style={{
                        backgroundColor: `${pathColor(
                          spaceComplexityData.score || 0
                        )}`,
                      }}
                    />
                    <span>공간 복잡도</span>
                  </div>
                  <h3
                    style={{
                      color: `${pathColor(spaceComplexityData.score || 0)}`,
                    }}
                  >
                    {addCommas(spaceComplexityData.solutionMemory || 0)} KB
                  </h3>
                </div>
                <div>
                  <div>
                    <div
                      className={style.circle}
                      style={{
                        backgroundColor: `${pathColor(
                          totalInfo?.gptTotalScore || 0
                        )}`,
                      }}
                    />
                    <span>클린 코드</span>
                  </div>
                  <h3
                    style={{
                      color: `${pathColor(totalInfo?.gptTotalScore || 0)}`,
                    }}
                  >
                    {refactoringData.cleanScore} Score
                  </h3>
                </div>
              </div>
            </div>

            {/* <div className={style.right_box}>
              <div style={{ width: "30%" }}>
                <div style={{ marginTop: "10px" }}>
                  <div
                    className={style.circle}
                    style={{
                      backgroundColor: `${pathColor(
                        timeComplexityData.score || 0
                      )}`,
                    }}
                  />
                  <span>시간 복잡도</span>
                </div>
                <h3
                  style={{
                    color: `${pathColor(timeComplexityData.score || 0)}`,
                  }}
                >
                  {addCommas(timeComplexityData.solutionRuntime || 0)} ms
                </h3>
              </div>
              <div style={{ width: "30%" }}>
                <div style={{ marginTop: "10px" }}>
                  <div
                    className={style.circle}
                    style={{
                      backgroundColor: `${pathColor(
                        spaceComplexityData.score || 0
                      )}`,
                    }}
                  />
                  <span>공간 복잡도</span>
                </div>
                <h3
                  style={{
                    color: `${pathColor(spaceComplexityData.score || 0)}`,
                  }}
                >
                  {addCommas(spaceComplexityData.solutionMemory || 0)} KB
                </h3>
              </div>
              <div style={{ width: "30%" }}>
                <div style={{ marginTop: "10px" }}>
                  <div
                    className={style.circle}
                    style={{
                      backgroundColor: `${pathColor(
                        totalInfo?.gptTotalScore || 0
                      )}`,
                    }}
                  />
                  <span>클린 코드</span>
                </div>
                <h3
                  style={{
                    color: `${pathColor(totalInfo?.gptTotalScore || 0)}`,
                  }}
                >
                  {refactoringData.cleanScore} Score
                </h3>
              </div>
              <div style={{ width: "30%" }}>
                <div style={{ marginTop: "10px" }}>
                  <div
                    className={style.circle}
                    style={{
                      backgroundColor: `${pathColor(10)}`,
                    }}
                  />
                  <span>낮은 점수</span>
                </div>
                <h3
                  style={{
                    color: `${pathColor(10)}`,
                  }}
                >
                  0 ~ 39
                </h3>
              </div>
              <div style={{ width: "30%" }}>
                <div style={{ marginTop: "10px" }}>
                  <div
                    className={style.circle}
                    style={{
                      backgroundColor: `${pathColor(50)}`,
                    }}
                  />
                  <span>중간 점수</span>
                </div>
                <h3
                  style={{
                    color: `${pathColor(50)}`,
                  }}
                >
                  40 ~ 79
                </h3>
              </div>
              <div style={{ width: "30%" }}>
                <div style={{ marginTop: "10px" }}>
                  <div
                    className={style.circle}
                    style={{
                      backgroundColor: `${pathColor(100)}`,
                    }}
                  />
                  <span>높은 점수</span>
                </div>
                <h3
                  style={{
                    color: `${pathColor(100)}`,
                  }}
                >
                  80 ~ 100
                </h3>
              </div>
            </div> */}
          </div>
          <CodeBox type={"TIME COMPLEXITY"} data={timeComplexityData} />
          <CodeBox type={"SPACE COMPLEXITY"} data={spaceComplexityData} />
          <CodeBox type={"REFACTORING"} data={refactoringData} />
        </>
      )}
    </div>
  );
};
