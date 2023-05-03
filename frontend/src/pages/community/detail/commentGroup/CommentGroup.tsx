import { v4 as uuidv4 } from "uuid";
import { Comment } from "./comment/Comment";
import style from "./CommentGroup.module.css";
import { Button } from "@/components/button/Button";
import { useState } from "react";

export const CommentGroup = () => {
  const dummyData = [
    { userName: "라면부엉", tier: 1, comment: "아라랄라라라라", recommend: 12 },
    { userName: "alice", tier: 2, comment: "아라랄라라라라", recommend: 1 },
    { userName: "Seja", tier: 3, comment: "아라랄라라라라", recommend: 12 },
  ];
  const [comment, setComment] = useState("");
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {dummyData.map((data) => (
        <Comment key={uuidv4()} data={data} />
      ))}
      <div className={style.content}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button
        content="댓글작성"
        onClick={() => {}}
        style={{ margin: "20px 3% 40px", float: "right" }}
      />
    </div>
  );
};
