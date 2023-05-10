import { ComplexityData, RefactoringData } from "../../hooks/query";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { backgroundColor, estimate, pathColor } from "../../hooks/func";
import "react-circular-progressbar/dist/styles.css";
import style from "./Complexity.module.css";
import { filteredNewLine } from "../refactoring/Refactoring";

interface ComplexityProps {
  isModalOpen: boolean;
  data: RefactoringData | ComplexityData;
  title: string;
}

export const Complexity = ({ isModalOpen, data, title }: ComplexityProps) => {
  const complexityData = data as ComplexityData;

  return (
    <div
      className={
        isModalOpen
          ? style.box_content
          : style.box_content + " " + style.not_open
      }
    >
      <div className={style.info_box}>
        <div style={{ width: "120px", textAlign: "center" }}>
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
          <h3>{title} :</h3>
          <h3>{complexityData.complexity}</h3>
          <div style={{ marginTop: "40px" }}>
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
          </div>
          <h3 style={{ color: `${pathColor(complexityData?.score || 0)}` }}>
            {complexityData.solutionMemory
              ? complexityData.solutionMemory + " KB"
              : complexityData.solutionRuntime + " ms"}
          </h3>
        </div>
      </div>
      {complexityData.complexityReason}
      <h3 style={{ marginTop: "50px", color: "rgba(0, 255, 0, 0.8)" }}>
        좋은 점
      </h3>
      {complexityData.complexityGoodPoint}
      <h3 style={{ marginTop: "30px", color: "rgba(255, 0, 0, 0.8)" }}>
        나쁜 점
      </h3>
      {complexityData.complexityBadPoint}
      <h3 style={{ marginTop: "30px", color: "rgba(130, 180, 180, 0.8)" }}>
        개선 의견
      </h3>
      {filteredNewLine(complexityData.complexitySuggestion)}
    </div>
  );
};
