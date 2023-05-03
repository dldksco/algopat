import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment, faPen, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { prevSelectedState } from "@/atoms/selected.atom";

import style from "./MenuBar.module.css";

export const MenuBar = () => {
    const navigate = useNavigate();
    const [prevSelected, setPrevSelected] = useRecoilState(prevSelectedState);

    const handleBoardItemClick = (id: string) => {
        navigate(`/mypage/recent/my${id}`);
        handleBarClick();
    };
    
    const handleBarClick =()=>{

    };
    return (
        <>
        <div className={style.whichBoard} id="myboard">
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.text} id="text" onClick={event => handleBoardItemClick(event.currentTarget.id)}>작성글<FontAwesomeIcon icon={faPen} className={style.icon} style={{"fontSize": "0.8rem"}}/></div>
            <div className={style.bar}></div>
          </div>
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.comment} id="comment"onClick={event => handleBoardItemClick(event.currentTarget.id)}>댓글 <FontAwesomeIcon icon = {faComment} className={style.icon}/></div>
            <div className={style.bar}></div>
          </div>
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.recommend} id="recommend" onClick={event => handleBoardItemClick(event.currentTarget.id)}>추천 <FontAwesomeIcon icon = {faThumbsUp} className={style.icon}/></div>
            <div className={style.bar}></div>
        </div>
          <div className={`${style.menu} ${style.menumargin}`}>
            <div className={style.alarm} id="alarm" onClick={event => handleBoardItemClick(event.currentTarget.id)}>최근 활동 <FontAwesomeIcon icon={faBell} className={style.icon}/></div>
            <div className={style.bar}></div>
          </div>
        </div>
        </>
        
        
    )
}
