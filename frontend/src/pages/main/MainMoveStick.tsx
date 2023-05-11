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
    position: "absolute",
    top: 0,
    // 스크롤 위치에 따라 왼쪽 또는 오른쪽에 위치하도록 설정합니다.
    left: `${scrollPosition / 4}px`,
  };

  const move_style_left: CSSProperties = {
    position: "absolute",
    top: 0,
    // 스크롤 위치에 따라 왼쪽 또는 오른쪽에 위치하도록 설정합니다.
    right: `${scrollPosition / 4}px`,
  };

  return (
    <div className={style.block}>
      <div className={style.row}>
        <div style={move_style_right}>
          <div className={style.green + " " + style.col}></div>
          <div className={style.black + " " + style.col}></div>
          <div className={style.black + " " + style.col}></div>
          <div className={style.green + " " + style.col}></div>
          <div className={style.white + " " + style.col}></div>
        </div>
      </div>
      <div className={style.row}>
        <div style={move_style_left}>
          <div className={style.green + " " + style.col}></div>
          <div className={style.black + " " + style.col}></div>
          <div className={style.green + " " + style.col}></div>
          <div className={style.black + " " + style.col}></div>
          <div className={style.white + " " + style.col}></div>
        </div>
      </div>
      {/* {dummy.map((row) => (
        <div style={move_style} className={style.row} key={uuidv4()}>
          {row.map((col) => (
            <div className={style.green + " " + style.col} key={uuidv4()} />
          ))}
        </div>
      ))} */}
    </div>
  );
};
