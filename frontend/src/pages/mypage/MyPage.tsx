import style from "./MyPage.module.css";
import { Activity, barProps } from "./activity/Activity";
import { Profile } from "./profile/Profile";
import { useState } from "react";
import { Recent } from "./recent/Recent";


export const MyPage = () => {
  const [activityBarState, setActivityBarState] = useState<barProps>("myprofile");
  
  function handleBarClick(selected: barProps){
    setActivityBarState(selected);
  }

  let componentToRender;
  if (activityBarState === "myprofile") {
    componentToRender = <Profile />;
  } else if (activityBarState === "recent") {
    componentToRender = <Recent />;
  }

  return (
    <>
      <div className={style.mypage}>
        <div className={style.buffer}></div>
        <Activity selected={handleBarClick}/>
        {componentToRender}
        <div style={{ height: "5%" }}></div>
      </div>
    </>
  );
};
