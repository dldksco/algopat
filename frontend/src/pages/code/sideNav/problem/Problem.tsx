import style from "./Problem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { stringCutter } from "../../hooks/func";

interface ProblemProps {
  data: Problem;
}

interface Problem {
  level: string;
  problemId: string;
  title: string;
  solved: Solve[];
}

interface Solve {
  submissionId: string;
}

export const Problem = ({ data }: ProblemProps) => {
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
          src={`https://static.solved.ac/tier_small/${data.level}.svg`}
          alt={data.level}
        />
        {data.problemId}. {stringCutter(data.title, 8)}
      </div>
      {isOpen
        ? data.solved.map((el) => (
            <div key={uuidv4()}>
              <hr color="gray" />
              <div className={style.solved}>
                풀이-{el.submissionId}
                <div className={style.trash_icon}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div style={{ clear: "both" }}></div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};
