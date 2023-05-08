import { useRecoilValue } from "recoil";
import { nowProblemState } from "@/atoms/code.atom";
import style from "./CodeDetail.module.css";

export const CodeDetail = () => {
  const nowProblem = useRecoilValue(nowProblemState);
  return (
    <div className={style.code_detail}>
      {!nowProblem ? (
        <div style={{ fontSize: "3rem", color: "gray", textAlign: "center" }}>
          ALGOPAT
        </div>
      ) : null}
    </div>
  );
};
