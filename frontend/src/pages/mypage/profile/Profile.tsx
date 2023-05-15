import { Grid } from "./grid/Grid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { useEffect } from "react";
import { getProfile } from "../hooks/query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import style from "./Profile.module.css";

export const Profile = () => {
  const { isLoading: isLoadingProfile, data: profileData } = getProfile();

  const getBackImage = async () => {
    const response = await axios.get(
      `https://solvedac-ixdn5ymk3a-du.a.run.app/backgroundShow/${tierData.backgroundId}`
    );
    const data = await response.data;
    return data;
  };

  const getTier = async () => {
    if (profileData === undefined) return;
    const response = await axios.get(
      `https://solvedac-ixdn5ymk3a-du.a.run.app/userShow/${profileData.userBackjoonId}`
    );
    const data = await response.data;
    return data;
  };

  const {
    isLoading: isLoadingImage,
    data: imageData,
    refetch: refetchImage,
  } = useQuery(["backimageupdate"], getBackImage, {
    enabled: false,
    staleTime: 5 * 1000 * 60,
  });

  const {
    isLoading: isLoadingTier,
    data: tierData,
    refetch: refetchTier,
  } = useQuery(["tierupdate"], getTier, {
    enabled: false,
    staleTime: 5 * 1000 * 60,
  });

  useEffect(() => {
    if (profileData && profileData.userBackjoonId !== "NO_SUBMITTED") {
      refetchTier();
      if (tierData) {
        refetchImage();
      }
    }
  });
  if (isLoadingProfile || isLoadingTier || isLoadingImage) {
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
            <img
              src={imageData.backgroundImageUrl}
              style={{ backgroundSize: "cover" }}
              alt=""
            />
          </div>
        ) : null}
        <div className={style.profileAll}>
          <div className={style.profilecontainer}>
            <div
              className={style.profileimage}
              style={{
                backgroundImage:
                  profileData !== undefined
                    ? `url(${profileData.userImageUrl})`
                    : undefined,
              }}
            ></div>
            <div className={style.profileinfo}>
              <div className={style.gitinfo}>
                <p className={style.nickname}>
                  {profileData !== undefined &&
                  profileData &&
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
                  {profileData !== undefined ? profileData.userGithubId : null}
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
