import style from "./MyPage.module.css";
import git from "@/assets/img/mypage/git.png";
import tier from "@/assets/img/mypage/tier.png";
import { Activity } from "./activity/Activity";
import { Header } from "../normal/header/Header";
import { Footer } from "../normal/footer/Footer";

export const MyPage = () => {
  return (
    <>
    <Header/>
    <div className = {style.mypage}>
        <div style={{height:"60px"}}></div>
        <Activity/>
        <div className = {style.profilebox}>
                <div className={style.profiletitle}>마이 프로필</div>
                <div className={style.profileimage}></div>
                <div className={style.profileinfo}>
                    <div className={style.gitinfo}>
                    <p className={style.nickname}>
                        <img src={tier} style={{marginRight: "6px", width: "12px", height: "auto"}} alt="solvedAC icon" />
                        닉네임</p>
                        <p className={style.email}>이메일</p>
                    </div>
                    <div className={style.setting}>
                        <p className={style.renew}>solved AC 티어 갱신
                        <img src={tier} style={{marginLeft: "6px", width: "12px", height: "auto"}} alt="solvedAC icon" />
                        </p>
                        <p className={style.git}>Git Repository 연동
                        <img src={git} style={{marginLeft: "6px", width: "19px", height: "auto"}} alt="github icon" />
                        </p>
                    </div>
                </div>
                <div className = {style.grass}>
                    
                </div>
        </div>
        <div style={{height:"120px"}}></div>        
    </div>
    <Footer/>
    </>
  )
}
