import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { ProblemItem } from "./problemitem/ProblemItem";

import style from "./Memo.module.css";
import { useEffect } from "react";
import { getGridDetail, problemByDate } from "@/pages/mypage/hooks/query";

interface dateData {
  date: string;
  thenum: number;
}

export const Memo = (props: dateData) => {
  const { data, isLoading, refetch } = getGridDetail(props.date);
  console.log(isLoading, "oasdasdiajsdi");
  if (props.thenum == 0 || isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  useEffect(() => {
    refetch();
  }, [props.date]);
  return (
    <>
      <div className={style.memo_container}>
        {data === undefined
          ? null
          : data.content.map((el: problemByDate) => (
              <div className={style.problem_item} key={uuidv4()}>
                <ProblemItem list={el} />
              </div>
            ))}
      </div>
    </>
  );
};
