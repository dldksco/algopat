import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import style from "./Comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CommentSet{
    data: CommentProps
}

interface CommentProps{
    userName: string,
    tier: number,
    comment: string,
    recommend: number,
}

export const Comment = ({data}: CommentSet)=> {
    const {userName, tier, comment, recommend} = data;
    return (
        <>
        <div className = {style.user}>
            <img src={`https://static.solved.ac/tier_small/${tier}.svg`} alt="tier"/>
            <span>{userName}</span>
        </div>
        <div className={style.comment}>
            <span>{comment}</span>
            <div className = {style.recommend}>
                <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                {recommend}
            </div>
        </div>
        </>        
    )
}
3