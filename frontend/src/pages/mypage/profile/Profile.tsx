import style from "./Profile.module.css";
import tier from "@/assets/img/mypage/tier.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
import { useSetRecoilState } from "recoil";
import { tierState } from "@/atoms/tier.atom";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";

export const Profile = () => {
  const setTodoList = useSetRecoilState(tierState);
  const fetchTier = async () => {  
    const response = await axios.get("/api",{
      params:{
        handle: "alice2596"
      }
    });
    const data =await response.data;
    console.log("data확인", data);
    return data;
  };
  const { isLoading, error, data} = useQuery(['todos'], fetchTier);
  if(isLoading){
    return <LoadingSpinner/>;
  }
  console.log(data, "data");
  // axios.interceptors.request.use(config => {
  //   console.log("어디로",config.url);
  //   return config;
  // });
  const buttonClickTier = async()=>{
    console.log("button");
    const response = await axios.get("/api",{
      params:{
        handle: "alice2596"
      }
    }).then((data) => console.log(data)).catch(error=>{
      console.error(error);
    });
    console.log(response, "엄");
    setTodoList(1);
  }
  const dummyData ={
    email: "ssafy@github.com",
    nickname: "김싸피",
    imageUrl: "src/assets/img/main/bird.png",
    grass:[
      {problemList:[{"problemId": 10, "problemName": "배열돌리기12"},{"problemId": 11, "problemName": "배열돌리기12"},{"problemId": 12, "problemName": "배열돌리기12"}] },
    ]
  }
  for (let i=0; i<365; i++)
  {
    const obj = {problemList:[{"problemId": 40, "problemName": "배열돌리기12"},{"problemId": 41, "problemName": "배열돌리기12"},{"problemId": 42, "problemName": "배열돌리기12"}] };  
    dummyData.grass.push(obj);
  }
  return (
    <>
    <div className={style.box}>
          <div className={style.profiletitle}>마이 프로필</div>
          <div className={style.profileimage} style={{backgroundImage : `url(${dummyData.imageUrl})`}}></div>
          <div className={style.profileinfo}>
            <div className={style.gitinfo}>
              <p className={style.nickname}>
                {data.tier > 0 ? 
                 <img
                 src={`https://static.solved.ac/tier_small/${data.tier}.svg`}
                 style={{ marginRight: "6px", width: "12px", height: "auto" }}
                 alt="solved AC 연동"
               /> : null }
                {dummyData.nickname}
              </p>
              <p className={style.email}>{dummyData.email}</p>
            </div>
            <div className={style.setting}>
              <p className={style.renew} onClick={buttonClickTier}>
                solved AC 연동
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
