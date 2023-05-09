import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { stringCutter } from "../../hooks/func";
import { $ } from "@/connect/axios";

import style from "./Problem.module.css";
import { useQuery } from "@tanstack/react-query";
import { ProblemDetail } from "./problemDetail/ProblemDetail";

export interface ProblemProps {
  detail: Problem;
}

export interface Problem {
  problemLevel: number;
  problemId: number;
  problemTitle: string;
}

export const Problem = ({ detail }: ProblemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // 이벤트는 코드 내에
  const problemClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <hr />
      <div className={style.problem_list} onClick={problemClick}>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={isOpen ? undefined : "fa-rotate-180"}
        />
        <img
          src={`https://static.solved.ac/tier_small/${detail.problemLevel}.svg`}
          alt={detail.problemTitle}
        />
        {detail.problemId}. {stringCutter(detail.problemTitle, 8)}
      </div>
      {isOpen ? <ProblemDetail problemId={detail.problemId} /> : null}
    </>
  );
};
