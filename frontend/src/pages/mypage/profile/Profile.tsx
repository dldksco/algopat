import style from "./Profile.module.css";
import tiericon from "@/assets/img/mypage/tier.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Grid } from "./grid/Grid";
import { useRecoilState } from "recoil";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { Modal } from "@/components/modal/Modal";
import { useState } from "react";
import { Input } from "@/components/input/Input";
import { authorizedAtom } from "@/atoms/authorize.atom";

export const Profile = () => {
  //solved ac user 검증  
  const [authorized, setAuthorized] = useRecoilState(authorizedAtom);

  //Modal 및 입력창
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  

  //tier use-query 
  const fetchTier = async () => {  
    const response = await axios.get("/api",{
      params:{
        handle: "alice2596"
      }
    });
    const data =await response.data;
    console.log("response", response.status);
    console.log("data확인", data);
    return data;
  };
// user 검증 - modal에서 입력시 연동
  const userCheck = async (userId: string) => {  
    const response = await axios.get("/api",{
      params:{
        handle: userId
      }
    }).then(response=>{
      console.log(response, "response");
      return response;
    }).catch(error => {
      console.error(error, "error 종류");
    })
    console.log("response 봐보자");
    console.log(response);
    return response;
  };

  const { isLoading, error, data} = useQuery(['tierupdate', authorized.isAuthorized, authorized.userId], async ()=>{
  const response = userCheck(authorized.userId);
  console.log("checkcheck");
  return response;},{enabled:authorized.isAuthorized});

  console.log(data, "data 저장 잘됐니");
  console.log(data?.data, "data 저장 잘됐니");
  console.log(data?.data.tier, "data 저장 잘됐니");
    console.log(authorized.isAuthorized, "인증성공이야?");
  if(isLoading && authorized.isAuthorized){
    return <LoadingSpinner/>;
  }
  // axios.interceptors.request.use(config => {
  //   console.log("어디로",config.url);
  //   return config;
  // });

  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event, "키보드 이벤트");
    console.log(event.key, "입력");
    if(event.key ==="Enter"){
      console.log("enter!!");
      setInputValue(event.currentTarget.value);
      userCheck(event.currentTarget.value).then(
        response =>{
          console.log("안녕?");
          console.log(response);
          if(response === undefined){
            setAuthorized({
                tier: -1,
                userId: "-1",
                isAuthorized: false,
              });
            console.log("asdas");
            window.alert("올바르지 못한 ID입니다"!);
          }          
          else
          {
            console.log(response.data.handle,"뭐라고 입력?");
            setAuthorized({
              userId: response.data.handle,
              isAuthorized: true,
              tier: -1,
            });
            setModalOpen(false);
            console.log("123123");
            window.alert("인증 성공");
          }
        }
      );
    }
  };
  // const buttonClickTier = async()=>{
  //   console.log("button");
  //   const response = await axios.get("/api",{
  //     params:{
  //       handle: "alice2596"
  //     }
  //   }).then((data) => console.log(data)).catch(error=>{
  //     console.error(error);
  //   });
  //   console.log(response, "엄");
  //   setTier(1);
  // }
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
                {authorized.isAuthorized === true && data?.data.tier > 0? 
                 <img
                 src={`https://static.solved.ac/tier_small/${data?.data.tier}.svg`}
                 style={{ marginRight: "6px", width: "12px", height: "auto" }}
                 alt=""
               /> : null }
                {dummyData.nickname}
              </p>
              <p className={style.email}>{dummyData.email}</p>
            </div>
            <div className={style.setting}>
              <p className={style.renew} onClick={()=> setModalOpen(true)}>
              <img
                  src={tiericon}
                  style={{ marginRight: "6px", width: "12px", height: "14px" }}
                  alt="solvedAC icon"
                />티어 연동
              </p>
              {modalOpen && (
              <Modal setModalOpen={setModalOpen}>
                <div className={style.modal} style={{margin:"10px 20px"}}><h1>Solved AC 티어 연동하기</h1>
                <p>solved ac id를 입력해주세요!</p>
                <Input
                    type="text"
                    placeholder="Enter text here"
                    input={inputValue}
                    setInput={setInputValue}
                    onKeyDown={handleKeyDown}
                  /></div>
                </Modal>
                )}
            </div>
          </div>
          <Grid/>
        </div>
          </>
  )
}
