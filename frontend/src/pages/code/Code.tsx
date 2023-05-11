// import PolynomialChart from "./graph/PolynomialChart";
import { useState } from "react";
import { SideNav } from "./sideNav/SideNav";
import { CodeDetail } from "./codeDetail/CodeDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import style from "./Code.module.css";

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
        <CodeDetail />
        <div className={style.hamberger} onClick={burgerClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        {/* <PolynomialChart /> */}
      </div>
    </div>
  );
};
