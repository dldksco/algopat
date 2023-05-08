import { useRecoilValue } from "recoil";
import { nowProblemState } from "@/atoms/code.atom";
import { useRef } from "react";
import style from "./CodeDetail.module.css";
import { Editor } from "@monaco-editor/react";

export const CodeDetail = () => {
  const nowProblem = useRecoilValue(nowProblemState);
  const dumy2 =
    "//여기에 코드 더미데이터 들어감\n// 되 냐?\nconst sad = 23123123123;";
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    // editorRef.current?.getValue() => 이걸로 값에 접근
  }
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
              <span>REFACTOR</span>
              <hr />
            </div>
            <div className={style.box_content}>
              <Editor
                height="350px"
                width="100%"
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
        </>
      )}
    </div>
  );
};
