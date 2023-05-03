import Editor from "@monaco-editor/react";
import { Input } from "@/components/input/Input";
import { useRef, useState } from "react";
import { SelectBox } from "@/components/selectBox/SelectBox";
import style from "./Create.module.css";

export const languages = [
  { value: "JAVA", name: "JAVA" },
  { value: "PYTHON", name: "PYTHON" },
  { value: "cpp", name: "C++" },
  { value: "javascript", name: "JAVASCRIPT" },
  { value: "csharp", name: "C" },
];

export const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("java");
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
          input={title}
          setInput={setTitle}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className={style.center} style={{ marginTop: "20px" }}>
        <span style={{ marginRight: "20px" }}>언어</span>
        <SelectBox
          value={language}
          options={languages}
          setValue={setLanguage}
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
            defaultLanguage={language}
            defaultValue={""}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              insertSpaces: true,
              tabSize: 4,
              fontSize: 16,
            }}
          />
        </div>
      </div>
      <div className={style.recommand}>
        <span>작성 완료</span>
      </div>
    </div>
  );
};
