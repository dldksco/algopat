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
      <hr />
      <div className={style.problem_list} onClick={problemClick}>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={isProblemOpen ? undefined : "fa-rotate-180"}
        />
        <img
          src={`https://static.solved.ac/tier_small/${detail.problemLevel}.svg`}
          alt={detail.problemTitle}
        />
        {detail.problemId}. {stringCutter(detail.problemTitle, 8)}
      </div>
      {isProblemOpen ? <ProblemDetail problemDetail={detail} /> : null}
    </>
  );
};
