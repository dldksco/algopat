import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { stringCutter } from "../../hooks/func";
import { problemOpenState } from "@/atoms/code.atom";

import style from "./Problem.module.css";
import { ProblemDetail } from "./problemDetail/ProblemDetail";
import { useRecoilState } from "recoil";

export interface ProblemProps {
  detail: Problem;
}

export interface Problem {
  problemLevel: number;
  problemId: number;
  problemTitle: string;
}

export const Problem = ({ detail }: ProblemProps) => {
  const [isProblemOpen, setIsProblemOpen] = useRecoilState(problemOpenState);
  // 이벤트는 코드 내에
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
