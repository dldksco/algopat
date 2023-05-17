import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { ProblemItem } from "./problemitem/ProblemItem";
import { getGridDetail, problemByDate } from "@/pages/mypage/hooks/query";
import style from "./Memo.module.css";

interface dateData {
  date: string;
  thenum: number;
}

export const Memo = (props: dateData) => {
  const { data, isLoading, refetch } = getGridDetail(props.date);
  if (props.thenum == 0 || isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          height: "10px",
          marginBottom: "0px",
        }}
      ></div>
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
