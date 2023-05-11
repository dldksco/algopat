import { v4 as uuidv4 } from "uuid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { useSetRecoilState } from "recoil";
import {
  isCodeNavOpenState,
  nowProblemSubmissionIdState,
} from "@/atoms/code.atom";
import { ProblemInfo, getSubmissionList } from "@/pages/code/hooks/query";
import { getCheckNowGptWork, stringCutter } from "@/pages/code/hooks/func";
import style from "./ProblemDetail.module.css";

export interface SolveProps {
  problemDetail: ProblemInfo;
  isProblemOpen: boolean;
}

export const ProblemDetail = ({ problemDetail, isProblemOpen }: SolveProps) => {
  const setNowSubmission = useSetRecoilState(nowProblemSubmissionIdState);
  const setIsSidenavOpen = useSetRecoilState(isCodeNavOpenState);
  const { isLoading, data } = getSubmissionList(problemDetail.problemId);
  const height = (data?.content.length as number) * 2 + 1;

  const handleSubmission = async (submissionId: number) => {
    const response = getCheckNowGptWork(submissionId);
    if (await response) {
      setNowSubmission({
        problemTitle: problemDetail.problemTitle,
        problemLevel: problemDetail.problemLevel,
        problemId: problemDetail.problemId,
        submissionId: submissionId,
        nowProcess: false,
      });
    } else {
      setNowSubmission({
        problemTitle: problemDetail.problemTitle,
        problemLevel: problemDetail.problemLevel,
        problemId: problemDetail.problemId,
        submissionId: submissionId,
        nowProcess: true,
      });
    }
    setIsSidenavOpen(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={style.detail_list}
      style={isProblemOpen ? { height: `${height}rem` } : { height: "0" }}
    >
      {data?.content.map((el) => (
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
      <hr />
    </div>
  );
};
