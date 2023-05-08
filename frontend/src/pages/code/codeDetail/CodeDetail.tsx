import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@monaco-editor/react";
import { useRecoilValue } from "recoil";
import { nowProblemState } from "@/atoms/code.atom";
import { useRef, useState } from "react";
import style from "./CodeDetail.module.css";

export const CodeDetail = () => {
  const [isRefactorOpen, setIsRefactorOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const nowProblem = useRecoilValue(nowProblemState);
  const dumy2 =
    "//여기에 코드 더미데이터 들어감\n// 되 냐?\nconst sad = 23123123123;";
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    // editorRef.current?.getValue() => 이걸로 값에 접근
  }

  const refactorOpen = () => {
    setIsRefactorOpen((prev) => !prev);
  };

  const timeOpen = () => {
    setIsTimeOpen((prev) => !prev);
  };

  return (
    <div className={style.code_detail}>
      {!nowProblem ? (
        <div
          style={{
            fontSize: "3rem",
            color: "gray",
            textAlign: "center",
            marginTop: "42vh",
          }}
        >
          ALGOPAT
        </div>
      ) : (
        <>
          <div className={style.info_box}>
            <div className={style.box_title}>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>REFACTOR</span>
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className={
                    isRefactorOpen
                      ? style.code_arrow
                      : style.code_arrow + " " + style.code_spin
                  }
                  onClick={refactorOpen}
                />
              </div>
              <hr />
            </div>
            <div
              className={
                isRefactorOpen
                  ? style.box_content
                  : style.box_content + " " + style.not_open
              }
            >
              <div style={{ marginLeft: "2%" }}>
                <Editor
                  width="98%"
                  height="300px"
                  defaultLanguage="javascript"
                  defaultValue={dumy2}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    insertSpaces: true,
                    tabSize: 4,
                    fontSize: 16,
                    readOnly: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div className={style.info_box}>
            <div className={style.box_title}>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>TIME COMPLEXITY</span>
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className={
                    isTimeOpen
                      ? style.code_arrow
                      : style.code_arrow + " " + style.code_spin
                  }
                  onClick={timeOpen}
                />
              </div>
              <hr />
            </div>
            <div
              className={
                isTimeOpen
                  ? style.box_content
                  : style.box_content + " " + style.not_open
              }
            ></div>
          </div>
        </>
      )}
    </div>
  );
};
