import Editor from "@monaco-editor/react";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/input/Input";
import { useState } from "react";
import style from "./Detail.module.css";
import { CommentGroup } from "./commentGroup/CommentGroup";

export const Detail = () => {
  const dumy2 = "//여기에 코드 더미데이터 들어감\n //되냐?";

  const [input, setInput] = useState("글의 제목");
  return (
    <div className={style.detail}>
      <div className={style.center}>
        <span>제목</span>
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
        <span>언어</span>
        <Input
          input={"JAVA"}
          setInput={setInput}
          disabled={true}
          style={{
            backgroundColor: "var(--mypage-box-color)",
            border: "none",
            width: "12%",
          }}
        />
      </div>
      <div className={style.center} style={{ marginTop: "20px" }}>
        <span>코드</span>
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
            theme="vs-dark"
            options={{
              insertSpaces: true,
              tabSize: 2,
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
