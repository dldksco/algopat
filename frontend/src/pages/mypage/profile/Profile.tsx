import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { $ } from "@/connect/axios";
import { useEffect } from "react";

import style from "./Profile.module.css";

export interface backgroundMyPage {
  authors: [];
  backgroundCategory: string;
  backgroundId: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: string | null;
  displayDescription: string;
  displayName: string;
  hiddenConditions: boolean;
  fallbackBackgroundImageUrl: string | null;
  isIllust: boolean;
  unlockedUserCount: number;
}
export const Profile = () => {
  const getProfile = async () => {
    const response = await $.get("/user/profile");
    // console.log("profile", response.data);
    return response.data;
  };
  const getBackImage = async () => {
    console.log(profileData, "id찾기");
    const response = await axios.get(
      `https://solvedac-ixdn5ymk3a-du.a.run.app/backgroundShow/${tierData.backgroundId}`
    );
    const data = await response.data;
    console.log(data, "imageData 내놔");
    return data;
  };
  const {
    isLoading: isLoadingProfile,
    error: profileError,
    data: profileData,
  } = useQuery(["profileupdate"], getProfile);

  const getTier = async () => {
    // console.log(profileData, "id찾기");
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
    isLoading: isLoadingImage,
    data: imageData,
    refetch: refetchImage,
  } = useQuery(["imageupdate"], getBackImage, { enabled: false });

  const {
    isLoading: isLoadingTier,
    data: tierData,
    refetch: refetchTier,
  } = useQuery(["tierupdate"], getTier, { enabled: false });

  useEffect(() => {
    if (profileData && profileData.userBackjoonId !== "NO_SUBMITTED") {
      refetchTier();
      if (tierData) {
        refetchImage();
      }
    }
  });

  if (isLoadingProfile || isLoadingTier || isLoadingImage) {
    // console.log(isLoadingTier, "123123123");
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <div className={style.box}>
        {imageData ? (
          <div className={style.backgroundImage}>
            <img src={imageData.backgroundImageUrl} alt="" />
          </div>
        ) : null}
        <div className={style.profileAll}>
          <div className={style.profilecontainer}>
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
                      style={{
                        marginRight: "6px",
                        width: "12px",
                        height: "auto",
                      }}
                      alt="solved AC 연동"
                    />
                  ) : null}
                  {profileData === undefined ? null : profileData.userGithubId}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.grid}>
          <Grid />
        </div>
      </div>
    </>
  );
};
