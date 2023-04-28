import { useState } from "react";
import style from "./Recent.module.css";
import { TextMenu } from "./textmenu/TextMenu";
import { CommentMenu } from "./commentmenu/CommentMenu";
import { RecommendMenu } from "./recommendmenu/RecommendMenu";

type recentItem = "text" | "comment" | "recommend";

export const Recent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("text");

  const handleMenuItemClick = (item: recentItem) => {
    setSelectedMenuItem(item);
  };

  return (
    <>
      <div className={style.box}>
        <div className={style.recentTitle}>최근 활동</div>
        <div className={style.whichBoard}>
          <div onClick={() => handleMenuItemClick("text")}>작성글</div>
          <div onClick={() => handleMenuItemClick("comment")}>작성 댓글</div>
          <div onClick={() => handleMenuItemClick("recommend")}>추천한 글</div>
        </div>
        <div
          className={style.board}
          style={{ border: "1px solid black", padding: "10px" }}
        >
          <TextMenu selected={selectedMenuItem} />
          <CommentMenu selected={selectedMenuItem} />
          <RecommendMenu selected={selectedMenuItem} />
        </div>
      </div>
    </>
  );
};
