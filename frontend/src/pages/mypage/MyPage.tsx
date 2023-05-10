import { Outlet } from "react-router-dom";
import { $ } from "@/connect/axios";

import style from "./MyPage.module.css";

interface userProfile {
  userGithubId: string;
  userImageUrl: string;
  userBackjoonId: string;
}

export const MyPage = () => {
  const fetchSubmission = async () => {
    const response = await $.get(`/user/profile`);
    // console.log("subission response 확인", response);
    // console.log("submission data 확인", response.data);
    return response.data.content;
  };

  return (
    <>
      <div className={style.mypage}>
        <Outlet />
        <div style={{ height: "5%" }}></div>
      </div>
    </>
  );
};
