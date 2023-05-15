import { Grid } from "./grid/Grid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { getBackImage, getProfile, getTier } from "../hooks/query";
import { useRecoilValue } from "recoil";
import { profileState } from "@/atoms/user.atom";

import style from "./Profile.module.css";

export const Profile = () => {
  const { isLoading: isLoadingProfile, data: profileData } = getProfile();
  const [isTier, setIsTier] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const myProfile = useRecoilValue(profileState);

  const {
    isLoading: isLoadingTier,
    data: tierData,
    refetch: refetchTier,
  } = getTier(myProfile.userBackjoonId, isTier);
  const {
    isLoading: isLoadingImage,
    data: imageData,
    refetch: refetchImage,
  } = getBackImage(myProfile.backgroundId, isBack);

  useEffect(() => {
    if (myProfile.backImage !== "") return;
    if (myProfile.userBackjoonId !== "NO_SUBMITTED") {
      setIsTier(true);
      refetchTier();
      setIsTier(false);
      if (myProfile.tier > 0) {
        setIsBack(true);
        refetchImage();
        setIsBack(false);
      }
    }
  }, [myProfile]);
  if (isLoadingProfile) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className={style.box}>
        <div className={style.backgroundImage}>
          {myProfile.backImage !== "" ? (
            <img
              src={myProfile.backImage}
              style={{ backgroundSize: "cover" }}
              alt=""
            />
          ) : (
            <div style={{ width: "100%", height: "300px" }} />
          )}
        </div>
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
                  {myProfile.userBackjoonId !== "NO_SUBMITTED" &&
                  myProfile.tier > 0 ? (
                    <img
                      src={`https://static.solved.ac/tier_small/${myProfile.tier}.svg`}
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
