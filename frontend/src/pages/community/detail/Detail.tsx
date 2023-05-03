import Editor from "@monaco-editor/react";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/input/Input";
import { useRef, useState } from "react";
import { CommentGroup } from "./commentGroup/CommentGroup";
import { SelectBox } from "@/components/selectBox/SelectBox";
import style from "./Detail.module.css";

export const Detail = () => {
  const [input, setInput] = useState("글의 제목");
  const dumy2 =
    "//여기에 코드 더미데이터 들어감\n// 되 냐?\nconst sad = 23123123123;";
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    // editorRef.current?.getValue() => 이걸로 값에 접근
  }

  return (
    <div className={style.detail}>
      <div className={style.center}>
        <span style={{ marginRight: "20px" }}>제목</span>
        <Input
          input={input}
          setInput={setInput}
          disabled={true}
          style={{
            backgroundColor: "var(--mypage-box-color)",
            border: "none",
            width: "90%",
          }}
        />
      </div>
      <div className={style.content}>
        <span>내용</span>
        <textarea
          defaultValue={"내용을 여기다가 집어넣는다.\n되냐?"}
          disabled={true}
        />
      </div>
      <div className={style.center} style={{ marginTop: "20px" }}>
        <span style={{ marginRight: "20px" }}>언어</span>
        <SelectBox
          value="JAVA"
          options={[{ value: "JAVA", name: "JAVA" }]}
          setValue={setInput}
          readonly={true}
          style={{
            backgroundColor: "var(--mypage-box-color)",
            border: "none",
            width: "140px",
          }}
        />
      </div>
      <div className={style.center} style={{ marginTop: "20px" }}>
        <span style={{ marginRight: "20px" }}>코드</span>
        <div
          style={{
            position: "relative",
            top: "-15px",
            right: "-50px",
            width: "85%",
          }}
        >
          <Editor
            height="250px"
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
      <div className={style.recommand}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <span>추천하기</span>
      </div>
      <CommentGroup />
    </div>
  );
};
