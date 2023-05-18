import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { stringCutter } from "../../hooks/func";
import { ProblemDetail } from "./problemDetail/ProblemDetail";
import { ProblemInfo } from "../../hooks/query";
import { useState } from "react";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import { useRecoilValue } from "recoil";
import style from "./Problem.module.css";

export interface ProblemProps {
  detail: ProblemInfo;
}

export const Problem = ({ detail }: ProblemProps) => {
  const nowSubmission = useRecoilValue(nowProblemSubmissionIdState);
  const [isProblemOpen, setIsProblemOpen] = useState(
    detail.problemId === nowSubmission.problemId ? true : false
  );

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
        {detail.problemId}. {stringCutter(detail.problemTitle, 10)}
      </div>
      <ProblemDetail problemDetail={detail} isProblemOpen={isProblemOpen} />
    </>
  );
};
