import { v4 as uuidv4 } from "uuid";
import { Comment } from "./comment/Comment";
import style from "./CommentGroup.module.css";
import { Button } from "@/components/button/Button";

export const CommentGroup = () => {
  const dummyData = [
    { userName: "라면부엉", tier: 1, comment: "아라랄라라라라", recommend: 12 },
    { userName: "alice", tier: 2, comment: "아라랄라라라라", recommend: 1 },
    { userName: "Seja", tier: 3, comment: "아라랄라라라라", recommend: 12 },
  ];
  return (
    <div>
      {dummyData.map((data) => (
        <Comment key={uuidv4()} data={data} />
      ))}
      <Button content="등록하기" onClick={() => {}} />
    </div>
  );
};
