import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import logo from "@/assets/img/logo.png";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <img className={style.logo} onClick={() => navigate("/")} src={logo} />
      <div className={style.menu}>
        <div onClick={() => navigate("/code")}>코드분석</div>
        <div onClick={() => navigate("/community")}>커뮤니티</div>
        <div onClick={() => navigate("/mypage")}>로그인</div>
      </div>
    </div>
  );
};
