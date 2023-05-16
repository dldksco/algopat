import style from "./TopArrow.module.css";

export const TopArrow = () => {
  return (
    <div
      className={style.scroll_to_top}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      &uarr;
    </div>
  );
};
