import style from "./MyPage.module.css";
import { Activity} from "./activity/Activity";
import { Outlet } from "react-router-dom";


export const MyPage = () => {
  return (
    <>
      <div className={style.mypage}>
        <div className={style.buffer}></div>
        <Activity/>
        <Outlet />
        <div style={{ height: "5%" }}></div>
      </div>
    </>
  );
};
