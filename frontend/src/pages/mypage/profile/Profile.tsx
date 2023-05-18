import { Grid } from "./grid/Grid";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { getBackImage, getProfile, getTier } from "../hooks/query";
import { useRecoilValue } from "recoil";
import { profileState } from "@/atoms/user.atom";
import { stringBackCutter } from "@/pages/code/hooks/func";
import changeBackImage from "@/assets/img/mypage/changeBackImage.gif";
import defaultBackImage from "@/assets/img/mypage/defaultBackImage.gif";
import secondBackImage from "@/assets/img/mypage/secondBackImage.gif";

import style from "./Profile.module.css";

export const Profile = () => {
  const { isLoading: isLoadingProfile, data: profileData } = getProfile();
  const [imageUrl, setImageUrl] = useState("");

  const [isTier, setIsTier] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const myProfile = useRecoilValue(profileState);
  let click = 0;
  const defaultBackgroundImage = defaultBackImage;

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
        click = 0;
        setImageUrl("");
      }
    }
  }, [myProfile, imageUrl]);
  if (isLoadingProfile) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  let secondClick = 0;
  const pandaClick = () => {
    click++;
    if (click > 5) {
      setImageUrl(changeBackImage);
      secondClick++;
    }
    if (click > 5 && secondClick > 1) {
      setImageUrl(secondBackImage);
    }
  };
  const handleClick = () => {
    window.location.href = "https://www.acmicpc.net/";
  };
  return (
    <>
      <div className={style.box}>
        <div className={style.backgroundImage}>
          {stringBackCutter(myProfile.backVideo, 3) === "mp4" ? (
            <div
              className={style.videoDiv}
              style={{
                width: "100%",
                height: "300px",
              }}
            >
              <video
                loop
                muted
                autoPlay
                height="300px"
                width="100%"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              >
                <source src={myProfile.backVideo} />
              </video>
            </div>
          ) : stringBackCutter(myProfile.backImage, 3) === "png" ? (
            <img
              src={myProfile.backImage}
              style={{ backgroundSize: "cover" }}
              alt=""
            />
          ) : imageUrl === "" ? (
            <div
              className={style.defaultBack}
              onClick={pandaClick}
              style={{
                width: "100%",
                height: "300px",
                backgroundImage: `url(${defaultBackgroundImage})`,
                backgroundColor: "white",
              }}
            >
              <div className={style.hoverContainer}>
                <div className={style.hoverBack} onClick={handleClick}>
                  백준 사이트에서 문제를 제출해주세요!
                </div>
                <div className={style.triangle}></div>
              </div>
            </div>
          ) : (
            <div
              className={style.defaultBackImage}
              onClick={pandaClick}
              style={{
                width: "100%",
                height: "300px",
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              <div className={style.hoverContainer}>
                <div className={style.hoverBack} onClick={handleClick}>
                  백준 사이트에서 문제를 제출해주세요!
                </div>
                <div className={style.triangle}></div>
              </div>
            </div>
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
            >
              <div className={style.profileTier}>
                {myProfile.userBackjoonId !== "NO_SUBMITTED" &&
                myProfile.tier > 0 ? (
                  <img
                    src={`https://static.solved.ac/tier_small/${myProfile.tier}.svg`}
                    alt="solved AC 연동"
                  />
                ) : null}
              </div>
            </div>
            <div className={style.profileinfo}>
              <div className={style.gitinfo}>
                <p className={style.nickname}>
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
