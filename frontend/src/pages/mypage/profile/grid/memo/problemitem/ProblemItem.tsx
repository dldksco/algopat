import { problemByDate } from "../Memo";
import style from "./ProblemItem.module.css";

interface dateDetail {
  data: problemByDate;
}
export const ProblemItem = (props: dateDetail) => {
  return (
    <>
      <div className={style.problem_container}>
        <div className={style.problemLevel}>
          <img
            src={`https://static.solved.ac/tier_small/${props.data.problemLevel}.svg`}
            alt={props.data.problemTitle}
          />
        </div>
        <div className={style.problemId}>{props.data.problemId}</div>
        <div className={style.problemName}>{props.data.problemTitle}</div>
      </div>
    </>
  );
};
