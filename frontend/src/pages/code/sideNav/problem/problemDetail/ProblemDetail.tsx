import { v4 as uuidv4 } from "uuid";
import { $ } from "@/connect/axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { useSetRecoilState } from "recoil";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import { ProblemInfo } from "@/pages/code/hooks/query";
import { stringCutter } from "@/pages/code/hooks/func";
import style from "./ProblemDetail.module.css";

export interface SolveProps {
  detail?: Solve[];
  problemDetail: ProblemInfo;
}

export interface Solve {
  submissionId: number;
  userSubmitSolutionTime: string;
}

export const ProblemDetail = (props: SolveProps) => {
  const setNowSubmission = useSetRecoilState(nowProblemSubmissionIdState);

  const fetchSubmission = async () => {
    const response = await $.get(
      `/code/problem/submission/solution/${props.problemDetail.problemId}/0`
    );
    // console.log("subission response 확인", response);
    // console.log("submission data 확인", response.data);
    return response.data.content;
  };

  const { isLoading, data } = useQuery(
    ["problemDetail", props.problemDetail.problemId],
    fetchSubmission
  );
  const handleSubmission = async (submissionId: number) => {
    const response = await $.get(
      `/code/problem/submission/solution/exist/${submissionId}`
    );
    if (response.data.data === true) {
      setNowSubmission({
        problemTitle: props.problemDetail.problemTitle,
        problemLevel: props.problemDetail.problemLevel,
        problemId: props.problemDetail.problemId,
        submissionId: submissionId,
        nowProcess: false,
      });
    } else {
      setNowSubmission({
        problemTitle: props.problemDetail.problemTitle,
        problemLevel: props.problemDetail.problemLevel,
        problemId: props.problemDetail.problemId,
        submissionId: submissionId,
        nowProcess: true,
      });
    }
  };

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
              {stringCutter(
                `풀이 ${new Date(el.userSubmitSolutionTime).toLocaleString()}`,
                23
              )}
            </div>
          ))}
    </>
  );
};
