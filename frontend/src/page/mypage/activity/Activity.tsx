import style from "./Activity.module.css";
import logout from "@/assets/img/mypage/logout.png";

export const Activity = () => {
  return (
    <div className={style.topbar}>
        <div className={style.content}>
          <span>마이프로필</span>
          <span>최근 활동</span>
          </div>
        <div className={style.logout}>
            <img src={logout} style={{marginRight: "10px"}} alt="logout icon" />
            로그아웃</div>
    </div>
)
}
