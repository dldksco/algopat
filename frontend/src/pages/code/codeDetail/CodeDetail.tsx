import { useRecoilValue } from "recoil";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import CodeBox from "../codeBox/CodeBox";
import { getSolution } from "../hooks/query";
import style from "./CodeDetail.module.css";

export const CodeDetail = () => {
  const nowProblem = useRecoilValue(nowProblemSubmissionIdState);
  const { data, isLoading } = getSolution(nowProblem);

  return (
    <div className={style.code_detail}>
      {!nowProblem ? (
        <div className={style.algopat}>ALGOPAT</div>
      ) : (
        <>
          <CodeBox type={"REFACTORING"} />
          <CodeBox type={"TIME COMPLEXITY"} />
          <CodeBox type={"SPACE COMPLEXITY"} />
        </>
      )}
    </div>
  );
};
