import style from "./CommentMenu.module.css";

interface CommentMenuProps{
    selected: string;
}

export const CommentMenu = ({selected}: CommentMenuProps) => {
    return (
        <div style={{display: selected === "recommend" ? "block" : "none"}}>
            CommentMenu
            <div className={style.context}>
            </div>
        </div>
    )
}
