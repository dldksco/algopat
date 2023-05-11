import { Outlet } from "react-router-dom";
import style from "./MyPage.module.css";

export const MyPage = () => {
  return (
    <>
      <div className={style.mypage}>
        <Outlet />
        <div style={{ height: "5%" }}></div>
      </div>
    </>
  );
};
