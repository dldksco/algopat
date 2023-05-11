import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { loginUser, logout, userInfoState } from "@/atoms/user.atom";
import { useRecoilState } from "recoil";
import logo from "@/assets/img/logo.png";
import style from "./Header.module.css";
import { $ } from "@/connect/axios";

export const Header = () => {
  const loginUrl =
    "https://github.com/login/oauth/authorize?client_id=62a8bd9fd0300fdc6d37&redirect_uri=https://algopat.kr/login-process";
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const changeOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const moveNav = (url: string) => {
    setIsOpen((prev) => !prev);
    navigate(url);
  };

  useEffect(() => {
    loginUser(setUserInfo);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const response = await $.get("/user/profile");
      console.log("profile", response.data);
      return response.data;
    };
    console.log(getProfile());
  }, []);

  return (
    <div className={style.header}>
      <img className={style.logo} onClick={() => navigate("/")} src={logo} />
      <div
        className={isOpen ? style.menu : style.menu + " " + style.menu_false}
      >
        <div className={style.for_hover} onClick={() => moveNav("/code")}>
          코드분석
        </div>
        <div className={style.for_hover} onClick={() => moveNav("/ranking")}>
          랭킹
        </div>
        {!userInfo.userSeq ? (
          <div
            className={style.for_hover}
            onClick={() => {
              window.open(
                loginUrl,
                "로그인 페이지",
                "height=500, width=500, resizable=false, menubar=false, toolbar=false"
              );
            }}
          >
            로그인
          </div>
        ) : (
          <div className={style.profile_div + " " + style.disnone}>
            <img
              src={profileUrl}
              alt="프로필 이미지"
              onClick={() => {
                navigate("/mypage");
              }}
            />
            <div className={style.down_slide}>
              <p className={style.for_hover} onClick={() => moveNav("/mypage")}>
                마이페이지
              </p>
              <p
                className={style.for_hover}
                onClick={() => {
                  logout(setUserInfo);
                }}
              >
                로그아웃
              </p>
            </div>
          </div>
        )}
        {userInfo.userSeq ? (
          <>
            <div
              className={style.for_hover2}
              onClick={() => moveNav("/mypage")}
            >
              마이페이지
            </div>
            <div
              className={style.for_hover2}
              onClick={() => {
                logout(setUserInfo);
              }}
            >
              로그아웃
            </div>
          </>
        ) : null}
      </div>
      <div className={style.bars}>
        {!isOpen ? (
          userInfo.userSeq ? (
            <div className={style.profile_div}>
              <img src={profileUrl} alt="프로필 이미지" onClick={changeOpen} />
            </div>
          ) : (
            <FontAwesomeIcon icon={faBars} onClick={changeOpen} />
          )
        ) : (
          <FontAwesomeIcon icon={faXmark} onClick={changeOpen} />
        )}
      </div>
    </div>
  );
};
