import { useEffect, useState } from "react";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { Outlet, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { prevSelectedState } from "@/atoms/selected.atom";
import style from "./Recent.module.css";
import { MenuBar } from "./menubar/MenuBar";

export const Recent = () => {
  const setPrevSelected = useSetRecoilState(prevSelectedState);

  // bar 위치 초기값
  useEffect(() => {
    setPrevSelected("text");
  }, []);

  return (
    <>
      <div className={style.box}>
        <div className={style.recentTitle}>최근 활동</div>
        <MenuBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
