import { useNavigate } from "react-router-dom";
import style from "./Page.404.module.css";
import logo from "@/assets/img/logo.png";

export const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className={style.page404}>
      <div className={style.top}>
        <h1>404</h1>
        <img className={style.logo} src={logo} />
        <h3>페이지를 찾을 수 없습니다</h3>
      </div>
      <div className={style.container}>
        <div className={style.ghost_copy}>
          <div className={style.one}></div>
          <div className={style.two}></div>
          <div className={style.three}></div>
          <div className={style.four}></div>
        </div>
        <div className={style.ghost}>
          <div className={style.face}>
            <div className={style.eye}></div>
            <div className={style.eye_right}></div>
            <div className={style.mouth}></div>
          </div>
        </div>
        <div className={style.shadow}></div>
      </div>
      <div className={style.bottom}>
        <div className={style.buttons}>
          <button className={style.btn} onClick={() => navigate(-1)}>
            Back
          </button>
          <button className={style.btn} onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
