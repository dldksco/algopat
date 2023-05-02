import style from "./Activity.module.css";
import logout from "@/assets/img/mypage/logout.png";

export type barProps ="myprofile" | "recent";


interface ActivityProps{
  selected: (eventData: barProps) => void;
}

export const Activity = (props: ActivityProps) => {
  const onBarClick = (barcontent: barProps) =>{
    props.selected(barcontent);
  };

  return (
    <div className={style.topbar}>
        <div className={style.content}>
          <span onClick={()=> onBarClick("myprofile")}>마이프로필</span>
          <span onClick={()=> onBarClick("recent")}>최근 활동</span>
          </div>
        <div className={style.logout} onClick={()=>{}}>
            <img src={logout} style={{marginRight: "7px", width:"12px", height: "12px"}} alt="logout icon" />
            로그아웃</div>
    </div>
);
};
