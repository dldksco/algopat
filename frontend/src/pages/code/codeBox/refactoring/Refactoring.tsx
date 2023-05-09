import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import style from "./Refactoring.module.css";

interface RefactoringProps {
  isModalOpen: boolean;
}

export const Refactoring = ({ isModalOpen }: RefactoringProps) => {
  const dumy2 =
    "//여기에 코드 더미데이터 들어감\n// 되 냐?\nconst sad = 23123123123;";
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    // editorRef.current?.getValue() => 이걸로 값에 접근
  };

  return (
    <div
      className={
        isModalOpen
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
  );
};
