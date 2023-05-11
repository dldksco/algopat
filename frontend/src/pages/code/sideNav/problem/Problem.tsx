import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { stringCutter } from "../../hooks/func";
import { ProblemDetail } from "./problemDetail/ProblemDetail";
import { ProblemInfo } from "../../hooks/query";
import { useState } from "react";
import style from "./Problem.module.css";

export interface ProblemProps {
  detail: ProblemInfo;
}

export const Problem = ({ detail }: ProblemProps) => {
  const [isProblemOpen, setIsProblemOpen] = useState(false);
  const problemClick = () => {
    setIsProblemOpen((prev) => !prev);
  };

  return (
    <>
      <div className={style.problem_list} onClick={problemClick}>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={isProblemOpen ? undefined : style.rotate}
          style={{ transition: "0.2s" }}
        />
        <img
          src={`https://static.solved.ac/tier_small/${detail.problemLevel}.svg`}
          alt={detail.problemTitle}
        />
        {detail.problemId}. {stringCutter(detail.problemTitle, 8)}
      </div>
      <hr />
      <ProblemDetail problemDetail={detail} isProblemOpen={isProblemOpen} />
    </>
  );
};
