import style from "./Code.module.css";
import PolynomialChart from "./graph/PolynomialChart";
import { useState } from "react";
import { SideNav } from "./sideNav/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Code = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const burgerClick = () => setIsSidenavOpen((prev) => !prev);
  return (
    <div className={style.code}>
      <div
        className={
          isSidenavOpen ? style.leftTab + " " + style.mobileon : style.leftTab
        }
      >
        <SideNav setIsSidenavOpen={setIsSidenavOpen} />
      </div>
      <div className={style.rightTab}>
        <div style={{ fontSize: "3rem", color: "gray" }}>ALGOPAT</div>
        {/* 뭔가 컴포넌트 <DetailPage/> */}
        <div className={style.hamberger} onClick={burgerClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {/* <PolynomialChart /> */}
      </div>
    </div>
  );
};
