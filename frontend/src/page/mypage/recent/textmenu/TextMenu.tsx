import style from "./TextMenu.module.css";

interface TextMenuProps{
    selected: string;
}

export const TextMenu = ({selected} : TextMenuProps) => {
    return (
        <div style={{display: selected === "text" ? "block" : "none"}}>
            TextMenu
            <div className={style.context}>
            </div>
        </div>
    )
}
