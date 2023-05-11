import { useState, useEffect } from "react";
import { SideNav } from "./sideNav/SideNav";
import { CodeDetail } from "./codeDetail/CodeDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/atoms/user.atom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./Code.module.css";

export const Code = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const burgerClick = () => setIsSidenavOpen((prev) => !prev);

  useEffect(() => {
    if (!userInfo.userSeq) {
      Swal.fire({
        icon: "warning",
        title: "",
        text: "로그인이 필요한 서비스입니다!",
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
        <SideNav setIsSidenavOpen={setIsSidenavOpen} />
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
