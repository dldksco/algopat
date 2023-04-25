import style from "./Header.module.css";
import logo from "@/assets/img/logo.png";

export const Header = () => {
  return <div className={style.header}>
      <img className={style.logo} src={logo} />
      <div className={style.menu}>
        <div>
          코드분석
        </div>
        <div>
          커뮤니티
        </div>
        <div>
          로그인
        </div>
      </div>
    </div>;
};
