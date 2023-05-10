import { v4 as uuidv4 } from "uuid";
import { $ } from "@/connect/axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { useRecoilState } from "recoil";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import { Problem } from "../Problem";

import style from "./ProblemDetail.module.css";
import axios from "axios";
import { Modal } from "@/components/modal/Modal";
import { useState } from "react";

export interface SolveProps {
  detail?: Solve[];
  problemDetail: Problem;
}

export interface Solve {
  submissionId: number;
  userSubmitSolutionTime: string;
}

export const ProblemDetail = (props: SolveProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [nowSubmission, setNowSubmission] = useRecoilState(
    nowProblemSubmissionIdState
  );

  const fetchSubmission = async () => {
    console.log("제출번호 조회 문제 번호", props.problemDetail.problemId);
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
    console.log(response.data, "response 확인");
    //response.data = true 생성 완료
    if (response.data === true) {
      setNowSubmission((prev) => ({
        ...prev,
        problemTitle: props.problemDetail.problemTitle,
        problemLevel: props.problemDetail.problemLevel,
        problemId: props.problemDetail.problemId,
        submissionId: submissionId,
        nowProcess: false, // process 끝
      }));
    } else {
      // false는 생성중
      setNowSubmission((prev) => ({
        ...prev,
        problemTitle: props.problemDetail.problemTitle,
        problemLevel: props.problemDetail.problemLevel,
        problemId: props.problemDetail.problemId,
        submissionId: submissionId,
        nowProcess: true, // process 진행중
      }));
    }
  };

  console.log(data, "submission query 결과");
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
              풀이 {new Date(el.userSubmitSolutionTime).toLocaleString()}
            </div>
          ))}
    </>
  );
};
