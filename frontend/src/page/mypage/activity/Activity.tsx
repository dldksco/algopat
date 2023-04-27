import { useRecoilState, useSetRecoilState } from "recoil";
import style from "./Activity.module.css";
import logout from "@/assets/img/mypage/logout.png";
import {activityBarState} from "./Activity.atom";

export const Activity = () => {
  
  const [activityBar, setActivityBar] = useRecoilState(activityBarState);
  const onBarClick = useSetRecoilState(activityBarState);

  return (
    <div className={style.topbar}>
        <div className={style.content}>
          <span onClick={()=> onBarClick((prev)=>"myprofile")}>마이프로필</span>
          <span onClick={()=> onBarClick((prev)=>"recent")}>최근 활동</span>
          </div>
        <div className={style.logout} onClick={()=>{}}>
            <img src={logout} style={{marginRight: "10px"}} alt="logout icon" />
            로그아웃</div>
    </div>
);
};
