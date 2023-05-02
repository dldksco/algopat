import { useEffect, useState } from "react";
import { TextMenu } from "./textmenu/TextMenu";
import { CommentMenu } from "./commentmenu/CommentMenu";
import { RecommendMenu } from "./recommendmenu/RecommendMenu";
import { AlarmMenu } from "./alarm/AlarmMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment, faPen, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import style from "./Recent.module.css";
import { Pagenation } from "@/components/pagenation/Pagenation";

export type recentItem = "text" | "comment" | "recommend" | "alarm";

export const Recent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<recentItem>("text");

  const handleMenuItemClick = (item: recentItem) => {
    setSelectedMenuItem(item);
    console.log(item);
    console.log(typeof(item));
    const buttons = document.getElementById("myboard");
    console.log(buttons, "buttons");
    const button = buttons?.querySelector(`#${item}`);
    console.log(button);
    const bar = buttons?.querySelector("#bar") as HTMLElement;
    if(button)
    {
      const containerRect = (button.parentNode as Element).getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const position = buttonRect.left - containerRect.left;
      const width = buttonRect?.width;
  
      bar.style.transform = `translateX(${position}px)`;
      bar.style.width = `${width}px`;
      console.log("button", width);  

    }
    console.log("나오니");
  };

  let componentToRender;
  if (selectedMenuItem === "text") {
    componentToRender = <TextMenu />;
  } else if (selectedMenuItem === "comment") {
    componentToRender = <CommentMenu />;
  } else if (selectedMenuItem === "recommend") {
    componentToRender = <RecommendMenu />;
  } else if (selectedMenuItem === "alarm") {
    componentToRender = <AlarmMenu />;
  }

  // bar 위치 초기값
  useEffect(() => {
    const buttons = document.getElementById("myboard");
    console.log(buttons, "buttons");
    const button = buttons?.querySelector("#text") as HTMLElement;
    console.log(button);
    const bar = buttons?.querySelector("#bar") as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const width = buttonRect?.width;
      bar.style.width = `${width}px`;
  }, []);

  let requestId: number | undefined;
  const handleResize = () => {
    if (requestId !== undefined) {
      window.cancelAnimationFrame(requestId);
    }
    requestId = window.requestAnimationFrame(() => {
      handleMenuItemClick(selectedMenuItem);
    });
  };
  
  window.addEventListener("resize", handleResize);
  
  return (
    <>
      <div className={style.box}>
        <div className={style.recentTitle}>최근 활동</div>
        <div className={style.whichBoard} id="myboard">
          <div className={style.text} id="text" onClick={() => handleMenuItemClick("text")}>
            작성글 <FontAwesomeIcon icon={faPen} className={style.icon} style={{"fontSize": "0.8rem"}}/>
          </div>
          <div className={style.comment} id="comment" onClick={() => handleMenuItemClick("comment")}>
            댓글 <FontAwesomeIcon icon = {faComment} className={style.icon}/>
          </div>
          <div className={style.recommend} id="recommend" onClick={() => handleMenuItemClick("recommend")}>
            추천 <FontAwesomeIcon icon = {faThumbsUp} className={style.icon}/>
            </div>
          <div className={style.alarm} id="alarm" onClick={() => handleMenuItemClick("alarm")}>
            최근 활동 <FontAwesomeIcon icon={faBell} className={style.icon}/>
          </div>
          <div className={style.bar} id="bar">
          </div>
        </div>
        <div>
          {componentToRender}

        </div>
        <Pagenation first={false} last={false} number={3} totalPages={32} />
      </div>
    </>
  );
};
