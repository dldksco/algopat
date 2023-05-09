import { ComplexityData, RefactoringData } from "../../hooks/query";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import style from "./Complexity.module.css";
import { backgroundColor, pathColor } from "../../hooks/func";

interface ComplexityProps {
  isModalOpen: boolean;
  data: RefactoringData | ComplexityData;
}

export const Complexity = ({ isModalOpen, data }: ComplexityProps) => {
  const complexityData = data as ComplexityData;

  return (
    <div
      className={
        isModalOpen
          ? style.box_content
          : style.box_content + " " + style.not_open
      }
    >
      <div style={{ width: "15%" }}>
        <CircularProgressbar
          value={complexityData?.Score || 0}
          text={`${complexityData?.Score || 0}%`}
          background={true}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "butt",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: pathColor(complexityData?.Score || 0),
            textColor: pathColor(complexityData?.Score || 0),
            trailColor: "#2d3970",
            backgroundColor: backgroundColor(complexityData?.Score || 0),
          })}
        />
      </div>
    </div>
  );
};
