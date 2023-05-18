import { ComplexityData, RefactoringData } from "../../hooks/query";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  addCommas,
  backgroundColor,
  estimate,
  pathColor,
} from "../../hooks/func";
import "react-circular-progressbar/dist/styles.css";
import style from "./Complexity.module.css";
import { filteredNewLine } from "../refactoring/Refactoring";
import { useRecoilValue } from "recoil";
import { problemInfoState } from "@/atoms/code.atom";

interface ComplexityProps {
  isModalOpen: boolean;
  data: RefactoringData | ComplexityData;
  title: string;
}

export const Complexity = ({ isModalOpen, data, title }: ComplexityProps) => {
  const complexityData = data as ComplexityData;
  const problemInfo = useRecoilValue(problemInfoState);

  return (
    <div
      className={
        isModalOpen
          ? style.box_content
          : style.box_content + " " + style.not_open
      }
    >
      <div className={style.info_box}>
        <div
          className={style.percentage}
          style={{ width: "30%", maxWidth: "120px", textAlign: "center" }}
        >
          <CircularProgressbar
            value={complexityData?.score || 0}
            text={`${complexityData?.score || 0}%`}
            background={true}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: pathColor(complexityData?.score || 0),
              textColor: pathColor(complexityData?.score || 0),
              trailColor: "#2d3970",
              backgroundColor: backgroundColor(complexityData?.score || 0),
            })}
          />
          <h2>{title}</h2>
        </div>
        <div className={style.right_box}>
          {/* <h3>시간제한 :{problemInfo.problemTimeLimit}</h3> */}
          <div className={style.comlexity}>
            <p>{title} </p>
            <p
              style={{
                marginTop: "5px",
                fontSize: "1.4rem",
                fontWeight: "700",
              }}
            >
              {complexityData.complexity}
            </p>
          </div>

          <span className={style.limit}>
            <p>{complexityData.solutionMemory ? "메모리 제한" : "시간 제한"}</p>
            <p>
              {complexityData.solutionMemory
                ? problemInfo.problemSpaceLimit
                : problemInfo.problemTimeLimit}
            </p>
          </span>
          <div className={style.complexity_result}>
            <div
              className={style.circle}
              style={{
                backgroundColor: `${pathColor(complexityData?.score || 0)}`,
              }}
            />
            <span>
              {estimate(
                complexityData?.score || 0,
                complexityData.solutionMemory ? "공간" : "시간"
              )}
            </span>
            <h3 style={{ color: `${pathColor(complexityData?.score || 0)}` }}>
              {complexityData.solutionMemory
                ? addCommas(complexityData.solutionMemory) + " KB"
                : addCommas(complexityData.solutionRuntime || 0) + " ms"}
            </h3>
          </div>
        </div>
      </div>
      <div className={style.text_box}>
        <p>{complexityData.complexityReason}</p>
      </div>
      <div
        className={style.text_box}
        style={{ backgroundColor: "HSLA(120, 100%, 50%, 0.15)" }}
      >
        <h3 style={{ marginTop: "20px", color: "rgba(0, 255, 0, 0.8)" }}>
          좋은 점
        </h3>
        <p>{complexityData.complexityGoodPoint}</p>
      </div>

      <div
        className={style.text_box}
        style={{ backgroundColor: "hsla(0, 100%, 50%, 0.15)" }}
      >
        <h3 style={{ marginTop: "20px", color: "red" }}>나쁜 점</h3>
        <p>{complexityData.complexityBadPoint}</p>
      </div>

      <div className={style.text_box}>
        <h3 style={{ marginTop: "20px", color: "rgba(130, 180, 180, 0.8)" }}>
          개선 의견
        </h3>
        {filteredNewLine(complexityData.complexitySuggestion)}
      </div>
    </div>
  );
};
