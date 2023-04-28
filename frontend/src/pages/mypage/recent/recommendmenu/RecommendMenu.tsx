import style from "./RecommendMenu.module.css";

interface RecommendMenuProps{
    selected: string;
}

export const RecommendMenu = ({selected}: RecommendMenuProps) => {
    return (
        <div style={{display: selected === "recommend" ? "block" : "none"}}>
            Good
            <div className={style.context}>
            </div>
        </div>
    )
}
