import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "./detail/comment/Comment";
import { Input } from "@/components/input/Input";
import { useState } from "react";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { Button } from "@/components/button/Button";

export const Community = () => {
  const dummyData = [
    { userName: "라면부엉", tier: 1, comment: "아라랄라라라라", recommend: 12 },
    { userName: "alice", tier: 2, comment: "아라랄라라라라", recommend: 1 },
    { userName: "Seja", tier: 3, comment: "아라랄라라라라", recommend: 12 },
  ];
  const highRecommend = dummyData.sort(
    (prev, current) => current.recommend - prev.recommend
  );
  const [input, setInput] = useState("");

  return (
    <>
      <div>Community</div>
      <div>
        <Pagenation first={false} last={false} number={3} totalPages={32} />
        <Input input={input} setInput={setInput} placeholder="플레이스홀더?" />
        <Button content="asdfa" onClick={() => {}} />
        {highRecommend.map((el) => (
          <Comment key={uuidv4()} data={el} />
        ))}
      </div>
      <Outlet />
    </>
  );
};
