import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment, faPen, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { prevSelectedState } from "@/atoms/selected.atom";

import style from "./MenuBar.module.css";
import { useRef } from "react";
export type recentItem = "text" | "comment" | "recommend" | "alarm";
interface recentItemProps {
  selectedMenu: recentItem;
}

export const MenuBar = () => {
    const navigate = useNavigate();
    const [prevSelected, setPrevSelected] = useRecoilState(prevSelectedState);
    const textRef = useRef(null);
    const commentRef = useRef(null);
    const recommendRef = useRef(null);
    const alarmRef = useRef(null);
    const barRef = useRef(null);
    
    const handleBoardItemClick = (id: string) => {
        console.log("123123");
        handleBarClick();
        navigate(`/mypage/recent/my${id}`);
    };
    
    const handleBarClick =()=>{
        const bar = barRef.current;
        console.log("1");
        // if(bar){
        //   const boardRect = (bar.parentNode as Element).getBoundingClientRect();
        //   console.log(boardRect, "boardRect");
        //   const menuRect = textRef.current.getBoundingClientRect();
        //   const pos = menuRect.left -boardRect.left;
        //   const barwidth = menuRect.width;
          
        // //   bar.style.transform = `translateX(${pos}px)`;
        // //   bar.style.width = `${barwidth}px`;
        //   console.log("useRef 잘고쳐졌니");
        // }
    };
    return (
        <>
        <div className={style.whichBoard} id="myboard">
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.text} ref={textRef} id="text" onClick={event => handleBoardItemClick(event.currentTarget.id)}>작성글<FontAwesomeIcon icon={faPen} className={style.icon} style={{"fontSize": "0.8rem"}}/></div>
            <div className={style.bar}></div>
          </div>
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.comment} ref={commentRef} id="comment"onClick={event => handleBoardItemClick(event.currentTarget.id)}>댓글 <FontAwesomeIcon icon = {faComment} className={style.icon}/></div>
            <div className={style.bar}></div>
          </div>
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.recommend} ref={recommendRef} id="recommend" onClick={event => handleBoardItemClick(event.currentTarget.id)}>추천 <FontAwesomeIcon icon = {faThumbsUp} className={style.icon}/></div>
            <div className={style.bar}></div>
        </div>
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.alarm} ref={alarmRef} id="alarm" onClick={event => handleBoardItemClick(event.currentTarget.id)}>최근 활동 <FontAwesomeIcon icon={faBell} className={style.icon}/></div>
            <div className={style.bar}></div>
          </div>
          <div className={style.bar} ref={barRef}></div>
        </div>
        </>
        
        
    )
}
