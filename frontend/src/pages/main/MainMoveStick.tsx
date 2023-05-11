import React, { CSSProperties, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import style from "./Main.module.css";

export const MainMoveStick = () => {
  const dummy = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => 0)
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // cleanup 함수에서 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  }

  const move_style_right: CSSProperties = {
    left: `${scrollPosition / 3}px`,
  };

  const move_style_left: CSSProperties = {
    right: `${scrollPosition / 3}px`,
  };

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
        <div className={style.moving_block} style={move_style_left}>
          <div className={style.black + " " + style.col + " " + style._3} />
          <div className={style.green + " " + style.col + " " + style._3} />
          <div className={style.black + " " + style.col + " " + style._3} />
        </div>
      </div>
      <div className={style.row}>
        <div className={style.moving_block} style={move_style_right}>
          <div className={style.green + " " + style.col + " " + style._3} />
          <div className={style.black + " " + style.col + " " + style._3} />
          <div className={style.white + " " + style.col + " " + style._1} />
          <div className={style.black + " " + style.col + " " + style._1} />
        </div>
      </div>
      <div className={style.row}>
        <div className={style.moving_block} style={move_style_left}>
          <div className={style.green + " " + style.col + " " + style._2} />
          <div className={style.black + " " + style.col + " " + style._0} />
          <div className={style.white + " " + style.col + " " + style._1} />
          <div className={style.green + " " + style.col + " " + style._1} />
        </div>
      </div> */}
    </div>
  );
};
