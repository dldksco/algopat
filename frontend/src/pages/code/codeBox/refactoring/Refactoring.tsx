import { Editor } from "@monaco-editor/react";
import { ComplexityData, RefactoringData } from "../../hooks/query";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { v4 as uuidv4 } from "uuid";
import { backgroundColor, pathColor, stringCutter } from "../../hooks/func";
import { nowProblemSubmissionIdState } from "@/atoms/code.atom";
import { useRecoilValue } from "recoil";
import { isMobile } from "@/pages/main/hooks/func";
import style from "./Refactoring.module.css";

interface RefactoringProps {
  isModalOpen: boolean;
  data: RefactoringData | ComplexityData;
}

export const filteredNewLine = (str: string | undefined) => {
  if (str === undefined) return null;

  return str.split(/\n/).map((line) => (
    <div key={uuidv4()}>
      <p>{line}</p>
    </div>
  ));
};

export const Refactoring = ({ isModalOpen, data }: RefactoringProps) => {
  const refactorData = data as RefactoringData;
  const problem = useRecoilValue(nowProblemSubmissionIdState);
  const beakjun = () => {
    window.location.href = `https://www.acmicpc.net/problem/${problem.problemId}`;
  };

  return (
    <div
      className={
        isModalOpen
          ? style.box_content
          : style.box_content + " " + style.not_open
      }
    >
      <div className={style.info_box}>
        <div style={{ width: "30%", maxWidth: "120px", textAlign: "center" }}>
          <CircularProgressbar
            value={refactorData?.cleanScore || 0}
            text={`${refactorData?.cleanScore || 0}%`}
            background={true}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: pathColor(refactorData?.cleanScore || 0),
              textColor: pathColor(refactorData?.cleanScore || 0),
              trailColor: "#2d3970",
              backgroundColor: backgroundColor(refactorData?.cleanScore || 0),
            })}
          />
          <h2>클린 코드</h2>
        </div>
        <div style={{ width: "40%" }}>
          INFO
          <hr style={{ marginTop: "5px" }} />
          <div className={style.problem_list}>
            <img
              src={`https://static.solved.ac/tier_small/${problem.problemLevel}.svg`}
              alt={problem.problemTitle}
            />
            {stringCutter(
              problem.problemId + ". " + problem.problemTitle,
              isMobile() ? 10 : 15
            )}
          </div>
          <hr />
          <div className={style.problem_list}>
            {refactorData?.language} /{" "}
            <span className={style.clicklink} onClick={beakjun}>
              코드 링크
            </span>
          </div>
          <hr />
        </div>
      </div>
      <div style={{ marginLeft: "2%" }}>
        <Editor
          width="98%"
          height="300px"
          language={refactorData?.language}
          value={refactorData?.submitCode}
          theme="vs-dark"
          options={{
            insertSpaces: true,
            tabSize: 4,
            fontSize: 16,
            readOnly: true,
          }}
        />
      </div>
      <br />
      {filteredNewLine(refactorData?.refactoringSuggestion)}
    </div>
  );
};
