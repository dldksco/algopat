import style from "./Code.module.css";
// import PolynomialChart from "./graph/PolynomialChart";
import { useState } from "react";
import { SideNav } from "./sideNav/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { CodeDetail } from "./codeDetail/CodeDetail";
import { useRecoilValue } from "recoil";
import { nowProblemState } from "@/atoms/code.atom";

export const Code = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const nowProblem = useRecoilValue(nowProblemState);

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
