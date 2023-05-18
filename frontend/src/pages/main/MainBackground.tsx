import { useEffect, useState } from "react";
import style from "./Main.module.css";
import mainBackground from "@/assets/img/main/background_dark.png";

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
      style={{
        transform: `scale(${scrollPosition / 10 + 100}%)`,
        backgroundImage: `linear-gradient(
          to right,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0) 8%,
          rgba(0, 0, 0, 0.8) 99%
        ),
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0) 8%,
          rgba(0, 0, 0, 0.8) 99%
        ), url(${mainBackground})`,
        backgroundSize: "cover",
        height: "90%",
        marginLeft: "30%",
        width: "70%",
        position: "relative",
        backgroundPosition: "center",
      }}
    />
  );
};
