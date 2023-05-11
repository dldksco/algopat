import { useState, useEffect } from "react";
import { SideNav } from "./sideNav/SideNav";
import { CodeDetail } from "./codeDetail/CodeDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./Code.module.css";
import { useRecoilState } from "recoil";
import { isCodeNavOpenState } from "@/atoms/code.atom";

export const Code = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useRecoilState(isCodeNavOpenState);
  const navigate = useNavigate();
  const burgerClick = () => setIsSidenavOpen((prev) => !prev);

  useEffect(() => {
    const info = localStorage.getItem("access-token");
    if (!info) {
      Swal.fire({
        title: "",
        text: "로그인이 필요한 서비스입니다!",
        icon: "error",
        confirmButtonText: "닫기",
      }).then(() => navigate("/"));
    }
  }, []);

  return (
    <div className={style.code}>
      <div
        className={
          isSidenavOpen ? style.leftTab + " " + style.mobileon : style.leftTab
        }
      >
        <SideNav />
      </div>
      <div className={style.rightTab}>
        <CodeDetail />
        <div className={style.hamberger} onClick={burgerClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
};
