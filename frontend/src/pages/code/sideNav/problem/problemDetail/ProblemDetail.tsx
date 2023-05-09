import { v4 as uuidv4 } from "uuid";
import { $ } from "@/connect/axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";

import style from "./ProblemDetail.module.css";
import { stringCutter } from "@/pages/code/hooks/func";
import { useRecoilState } from "recoil";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";

export interface SolveProps {
  detail?: Solve[];
  problemId: number;
}

export interface Solve {
  submissionId: number;
  userSubmitSolutionTime: string;
}

export const ProblemDetail = (props: SolveProps) => {
  const [nowSubmission, setNowSubmission] = useRecoilState(
    nowProblemSubmissionIdState
  );

  const fetchSubmission = async () => {
    console.log("제출번호 조회 문제 번호", props.problemId);
    const response = await $.get(
      `/code/problem/submission/solution/${props.problemId}/0`
    );
    // console.log("subission response 확인", response);
    // console.log("submission data 확인", response.data);
    return response.data.content;
  };

  const { isLoading, data } = useQuery(
    ["problemDetail", props.problemId],
    fetchSubmission
  );

  const handleSubmission = (submissionId: number) => {
    setNowSubmission(submissionId);
    //console.log("weq", submissionId);
  };

  //console.log(data, "submission query 결과");
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {data === undefined && !isLoading
        ? null
        : data.map((el: Solve) => (
            <div
              key={uuidv4()}
              className={style.submission_list}
              onClick={() => handleSubmission(el.submissionId)}
            >
              - {new Date(el.userSubmitSolutionTime).toDateString()}
            </div>
          ))}
    </>
  );
};
