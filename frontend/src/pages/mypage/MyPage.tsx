import style from "./MyPage.module.css";
import { Outlet } from "react-router-dom";

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
