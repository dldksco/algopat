import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
import { useRecoilValue } from "recoil";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { userInfoState } from "@/atoms/user.atom";

import style from "./Profile.module.css";

export const Profile = () => {
  const userInfo = useRecoilValue(userInfoState);
  //tier use-query
  const fetchTier = async () => {
    const response = await axios.get("/solved", {
      params: {
        handle: "alice2596",
      },
    });
    const data = await response.data;
    // console.log("data확인", data);
    return data;
  };

  const { isLoading, error, data } = useQuery(["tierupdate"], fetchTier);
  // console.log(data, "query 결과");
  // console.log(data, "query solvedid");
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const dummyData = {
    email: "ssafy@github.com",
    nickname: "김싸피",
    imageUrl: "src/assets/img/main/bird.png",
    solvedid: "alice2596",
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
          style={{ backgroundImage: `url(${dummyData.imageUrl})` }}
        ></div>
        <div className={style.profileinfo}>
          <div className={style.gitinfo}>
            <p className={style.nickname}>
              {data.tier > 0 ? (
                <img
                  src={`https://static.solved.ac/tier_small/${data.tier}.svg`}
                  style={{ marginRight: "6px", width: "12px", height: "auto" }}
                  alt="solved AC 연동"
                />
              ) : null}
              {dummyData.nickname}
            </p>
            <p className={style.email}>{dummyData.email}</p>
          </div>
        </div>
        <Grid />
      </div>
    </>
  );
};
