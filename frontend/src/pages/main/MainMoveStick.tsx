import { useEffect, useState } from "react";

import style from "./Main.module.css";

export const MainMoveStick = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // cleanup 함수에서 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={style.block}>
      <div className={style.row} style={move_style_right}>
        <div className={style.white + " " + style.col + " " + style._3} />
        <div className={style.black + " " + style.col + " " + style._3} />
        <div className={style.white + " " + style.col + " " + style._1} />
        <div className={style.black + " " + style.col + " " + style._3} />
      </div>
      {/* <div className={style.row} style={move_style_left}>
        <div className={style.green + " " + style.col + " " + style._3} />
        <div className={style.black + " " + style.col + " " + style._3} />
        <div className={style.green + " " + style.col + " " + style._3} />
        <div className={style.black + " " + style.col + " " + style._3} />
        <div className={style.white + " " + style.col + " " + style._2} />
        <div className={style.black + " " + style.col + " " + style._1} />
        <div className={style.green + " " + style.col + " " + style._1} />
      </div> */}
      {/* <div className={style.row}>
        <div className={style.moving_block} style={move_style_right}>
          <div className={style.black + " " + style.col + " " + style._2} />
          <div className={style.white + " " + style.col + " " + style._1} />
          <div className={style.black + " " + style.col + " " + style._1} />
          <div className={style.white + " " + style.col + " " + style._1} />
        </div>
      </div>
      <div className={style.row}>
        <div
          style={{
            transform: `translateX(calc(-50% + ${scrollPosition / 1.8}px))`,
          }}
        >
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
        </div>
      </div>
      <div className={style.row}>
        <div
          style={{
            transform: `translateX(calc(100% - ${scrollPosition / 3}px))`,
          }}
        >
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.white + " " + style.col} />
        </div>
      </div>
      <div className={style.row}>
        <div
          style={{
            transform: `translateX(calc(-50% + ${scrollPosition / 1}px))`,
          }}
        >
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
        </div>
      </div>
      <div className={style.row}>
        <div
          style={{
            transform: `translateX(calc(100% - ${scrollPosition / 1.5}px))`,
          }}
        >
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
        </div>
      </div>
      <div className={style.row}>
        <div
          style={{
            transform: `translateX(calc(-80% + ${scrollPosition / 2.4}px))`,
          }}
        >
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.white + " " + style.col} />
          <div className={style.black + " " + style.col} />
          <div className={style.green + " " + style.col} />
          <div className={style.black + " " + style.col} />
        </div>
      </div>
    </div>
  );
};
