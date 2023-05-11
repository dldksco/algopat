import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { $ } from "@/connect/axios";
import { useEffect } from "react";

import style from "./Profile.module.css";

export const Profile = () => {
  const getProfile = async () => {
    const response = await $.get("/user/profile");
    console.log("profile", response.data);
    return response.data;
  };

  const {
    isLoading: isLoadingProfile,
    error: profileError,
    data: profileData,
  } = useQuery(["profileupdate"], getProfile);

  const getTier = async () => {
    console.log(profileData, "id찾기");
    const response = await axios.get(
      `https://solvedac-ixdn5ymk3a-du.a.run.app/userShow/${profileData.userBackjoonId}`
    );
    const data = await response.data;
    console.log(data, "tierData");
    return data;
  };

  // console.log(data, "query 결과");
  // console.log(data, "query solvedid");

  const {
    isLoading: isLoadingTier,
    error: tierError,
    data: tierData,
    refetch: refetchTier,
  } = useQuery(["tierupdate"], getTier, { enabled: false });

  useEffect(() => {
    if (profileData && profileData.userBackjoonId !== "NO_SUBMITTED") {
      refetchTier();
    }
  });

  if (isLoadingProfile || isLoadingTier) {
    console.log(isLoadingTier, "123123123");
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <div className={style.box}>
        <div className={style.profiletitle}>마이 프로필</div>
        <div
          className={style.profileimage}
          style={{
            backgroundImage:
              profileData === undefined
                ? undefined
                : `url(${profileData.userImageUrl})`,
          }}
        ></div>
        <div className={style.profileinfo}>
          <div className={style.gitinfo}>
            <p className={style.nickname}>
              {profileData !== undefined &&
              profileData.userBackjoonId !== "NO_SUBMITTED" &&
              tierData.tier > 0 ? (
                <img
                  src={`https://static.solved.ac/tier_small/${tierData.tier}.svg`}
                  style={{ marginRight: "6px", width: "12px", height: "auto" }}
                  alt="solved AC 연동"
                />
              ) : null}
              {profileData === undefined ? null : profileData.userGithubId}
            </p>
          </div>
        </div>
        <Grid />
      </div>
    </>
  );
};