import style from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.leftbox}>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
      </div>
      <div className={style.rightbox}>
        <p>SSAFY 8기 2학기 자율 프로젝트</p>
        <p>김소현 | 박동환 | 이안채 | 이연학 | 이찬희 | 최웅렬</p>
        <p>Copyright©ALGOPAT All Rights Reserved.</p>
      </div>
    </div>
  );
};
