import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { $ } from "@/connect/axios";

import style from "./Profile.module.css";
import { useEffect } from "react";

export const Profile = () => {
  const id = "alice2596";
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
    console.log("문제>");
    if (profileData && profileData.userBackjoonId !== "NO_SUBMITTED") {
      console.log("무눙ㅁ나ㅜㅇ마누아ㅣ무니아 문제");
      refetchTier();
    }
  });

  if (isLoadingTier || isLoadingProfile)
    console.log("어떤게 문제 tier", isLoadingTier);
  console.log("어떤게 문제 profile", isLoadingProfile);
  return (
    <div>
      <LoadingSpinner />
    </div>
  );
  //tier use-query

  const dummyData = {
    grass: [] as number[],
  };
  for (let i = 0; i < 120; i++) {
    dummyData.grass.push(1);
  }
  for (let i = 0; i < 120; i++) {
    dummyData.grass.push(3);
  }
  for (let i = 0; i < 125; i++) {
    dummyData.grass.push(6);
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
              {tierData.tier > 0 && tierData !== undefined ? (
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
