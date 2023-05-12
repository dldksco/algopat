import { CodeDetail } from "../codeDetail/CodeDetail";
import { TopArrow } from "@/components/toparrow/TopArrow";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  nowProblemSubmissionIdState,
  toekenForDetailState,
} from "@/atoms/code.atom";
import style from "./Extension.module.css";

export const Extension = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";
  const problemTitle = searchParams.get("problemtitle") || "";
  const problemId = Number(searchParams.get("problemid")) || 0;
  const problemLevel = Number(searchParams.get("problemlevel")) || 0;
  const submissionId = Number(searchParams.get("submissionid")) || 0;
  const setNowSubmission = useSetRecoilState(nowProblemSubmissionIdState);
  const setToekenForDetail = useSetRecoilState(toekenForDetailState);
  const navigate = useNavigate();

  useEffect(() => {
    setNowSubmission({
      problemTitle: problemTitle,
      problemId: problemId,
      problemLevel: problemLevel,
      submissionId: submissionId,
      nowProcess: false,
    });
    setToekenForDetail(token);
  }, []);

  return (
    <div
      style={{ width: "100%", backgroundColor: "var(--code-background-color)" }}
    >
      <div className={style.code}>
        <div className={style.rightTab}>
          <CodeDetail />
        </div>
        <TopArrow />
      </div>
    </div>
  );
};
