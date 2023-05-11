import { useRecoilState } from "recoil";
import style from "./ProblemItem.module.css";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { problemByDate } from "@/pages/mypage/hooks/query";

interface dateDetail {
  list: problemByDate;
}

export const ProblemItem = (props: dateDetail) => {
  const [submissionState, setSubmissionState] = useRecoilState(
    nowProblemSubmissionIdState
  );
  const [isClickedState, setIsClickedState] = useState(false);

  useEffect(() => {
    console.log(submissionState);
    if (isClickedState) {
      navigate("/code");
    }
  }, [submissionState]);
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log(123123);
    // console.log(props.data.problemId);
    setSubmissionState({
      problemId: props.list.problemId,
      submissionId: props.list.submissionId,
      problemLevel: props.list.problemLevel,
      problemTitle: props.list.problemTitle,
      nowProcess: false,
    });
    setIsClickedState(true);
  };
  return (
    <>
      <div className={style.problem_container} onClick={handleClick}>
        <div className={style.problemLevel}>
          <img
            src={`https://static.solved.ac/tier_small/${props.list.problemLevel}.svg`}
            alt={props.list.problemTitle}
          />
        </div>
        <div className={style.problemId}>{props.list.problemId}.</div>
        <div className={style.problemName}>{props.list.problemTitle}</div>
      </div>
    </>
  );
};
