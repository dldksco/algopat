import { useEffect, useState } from "react";
import style from "./Main.module.css";

export const MainBackground = () => {
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
    <div
      className={style.code_background}
      style={{ transform: `scale(${scrollPosition / 10 + 100}%)` }}
    />
  );
};
