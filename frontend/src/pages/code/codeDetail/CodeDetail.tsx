import { useRecoilValue } from "recoil";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import CodeBox from "../codeBox/CodeBox";
import { getSolution } from "../hooks/query";
import style from "./CodeDetail.module.css";

export const CodeDetail = () => {
  const nowProblem = useRecoilValue(nowProblemSubmissionIdState);
  const {
    refactoringData,
    timeComplexityData,
    spaceComplexityData,
    totalInfo,
    isLoading,
  } = getSolution(nowProblem.submissionId);

  return (
    <div className={style.code_detail}>
      {!nowProblem ? (
        <div className={style.algopat}>ALGOPAT</div>
      ) : (
        <>
          <CodeBox type={"REFACTORING"} data={refactoringData} />
          {/* <CodeBox type={"TIME COMPLEXITY"} data={timeComplexityData} />
          <CodeBox type={"SPACE COMPLEXITY"} data={spaceComplexityData} /> */}
        </>
      )}
    </div>
  );
};
