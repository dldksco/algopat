import { useNavigate } from "react-router-dom";
import ssafy from "@/assets/img/footer/ssafy.png";
import algopat from "@/assets/img/footer/algopat.png";
import notion from "@/assets/img/footer/notion.png";
import style from "./Footer.module.css";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={style.footer}>
      <div className={style.leftbox}>
        <div className={style.circle}>
          <img
            className={style.ssafy}
            src={ssafy}
            onClick={() => {
              window.location.href =
                "https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp";
            }}
          />
        </div>
        <div className={style.circle}>
          <img
            className={style.algopat}
            src={algopat}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              navigate("/");
            }}
          />
        </div>
        <div className={style.circle}>
          <img
            className={style.notion}
            src={notion}
            onClick={() => {
              window.location.href =
                "https://ramen-buang.notion.site/SSAFY-2-ALGOPAT-dbb58b913794443d8592f46eca0477be";
            }}
          />
        </div>
      </div>
      <div className={style.rightbox}>
        <p>SSAFY 8기 2학기 자율 프로젝트</p>
        <p>김소현 | 박동환 | 이안채 | 이연학 | 이찬희 | 최웅렬</p>
        <p>Copyright©ALGOPAT All Rights Reserved.</p>
      </div>
    </div>
  );
};
