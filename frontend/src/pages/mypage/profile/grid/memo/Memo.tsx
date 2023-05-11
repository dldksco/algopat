import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { ProblemItem } from "./problemitem/ProblemItem";

import style from "./Memo.module.css";

interface dateData {
  date: string;
  thenum: number;
}

export interface problemByDate {
  problemId: number;
  problemLevel: number;
  problemTitle: string;
  submissionId: number;
}

export const Memo = (props: dateData) => {
  const dateConvert = props.date.split("-"); // ["2023", "01", "01"]
  const dateToSend = dateConvert.join(""); // "20230101"
  console.log(dateToSend);
  const memoEnabled = props.thenum > 0;
  const getGridDetail = async () => {
    const response = await $.get(`/code/grass/${dateToSend}`);
    console.log(response.data);
    return response.data;
  };
  const {
    isLoading: isLoadingProblem,
    error: problemError,
    data: problemData,
  } = useQuery(["gridDetailupdate"], getGridDetail, { enabled: memoEnabled });

  if (props.thenum != 0 && isLoadingProblem) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div
        className={style.memo_container}
        style={{
          display: props.date === "" ? "none" : "block",
        }}
      >
        <p>{props.date} 내가 푼 문제 목록</p>
        {problemData === undefined
          ? null
          : problemData.content.map((el: problemByDate) => (
              <div key={uuidv4()}>
                <ProblemItem data={el} />
              </div>
            ))}
      </div>
    </>
  );
};
