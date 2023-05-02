import style from "./Profile.module.css";
import tier from "@/assets/img/mypage/tier.png";
import git from "@/assets/img/mypage/git.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
//import { useSetRecoilState } from "recoil";
//import { tierState } from "@/atoms/tier.atom";

export const Profile = () => {
  //const setTodoList = useSetRecoilState(tierState);
  const buttonClickTier =()=>{
    console.log("button");
    // const { isLoading, error, data, refetch } = useQuery(['todos'], async () => {
    //   const response = await axios.get("https://solved.ac/api/v3/account/verify_credentials");
    //   console.log(response.data, "data");
    //   console.log(isLoading, error, data, refetch);
    //   return response.data;
    // });
  }

  const dummyData ={
    email: "ssafy@github.com",
    nickname: "김싸피",
    imageUrl: "src/assets/img/main/bird.png",
    grass:[
      {problemList:[{"problemId": 10, "problemName": "배열돌리기12"},{"problemId": 11, "problemName": "배열돌리기12"},{"problemId": 12, "problemName": "배열돌리기12"}] },
      {problemList:[{"problemId": 20, "problemName": "배열돌리기12"},{"problemId": 21, "problemName": "배열돌리기12"},{"problemId": 22, "problemName": "배열돌리기12"},] },
      {problemList:[{"problemId": 30, "problemName": "배열돌리기12"},{"problemId": 31, "problemName": "배열돌리기12"},{"problemId": 32, "problemName": "배열돌리기12"}] },
      {problemList:[{"problemId": 40, "problemName": "배열돌리기12"},{"problemId": 41, "problemName": "배열돌리기12"},{"problemId": 42, "problemName": "배열돌리기12"}] },
    ]
  }
  return (
    <>
    <div className={style.box}>
          <div className={style.profiletitle}>마이 프로필</div>
          <div className={style.profileimage} style={{backgroundImage : `url(${dummyData.imageUrl})`}}></div>
          <div className={style.profileinfo}>
            <div className={style.gitinfo}>
              <p className={style.nickname}>
                <img
                  src={tier}
                  style={{ marginRight: "6px", width: "12px", height: "auto" }}
                  alt="solvedAC icon"
                />
                {dummyData.nickname}
              </p>
              <p className={style.email}>{dummyData.email}</p>
            </div>
            <div className={style.setting}>
              <p className={style.renew} onClick={buttonClickTier}>
                solved AC 티어 갱신
                <img
                  src={tier}
                  style={{ marginLeft: "6px", width: "12px", height: "auto" }}
                  alt="solvedAC icon"
                />
              </p>
              
            </div>
            
          </div>
          
          <Grid/>
        </div>
          </>
  )
}
