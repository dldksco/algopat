import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";
import {
  faArrowDownWideShort,
  faCircleXmark,
  faHouse,
  faUser,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowDown91 } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import sort_tier_img from "@/assets/img/code/sort_tier.png";
import { Button } from "@/components/button/Button";
import { getInfinityProblemList } from "../hooks/query";
import { Problem } from "./problem/Problem";
import { isCodeNavOpenState } from "@/atoms/code.atom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import style from "./SideNav.module.css";

export const SideNav = () => {
  const [category, setCategory] = useState("date");
  const [condition, setCondition] = useState("asc");
  const setIsSidenavOpen = useSetRecoilState(isCodeNavOpenState);
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage } = getInfinityProblemList(
    category,
    condition
  );

  const xButtonClick = () => setIsSidenavOpen(false);
  const serchClick = (str: string) => {
    setCategory(str);
    if (category !== str) setCondition("asc");
    else setCondition((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className={style.sideNav}>
      <p>코드 분석</p>
      <div className={style.x_button} onClick={xButtonClick}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>

      <div className={style.sort_button_group}>
        <div
          className={style.sort_button}
          onClick={() => serchClick("date")}
          style={
            category === "date"
              ? { color: "skyblue", border: "1px solid skyblue" }
              : undefined
          }
        >
          <FontAwesomeIcon icon={faClock} style={{ transition: "0.1s" }} />
          <FontAwesomeIcon
            icon={faArrowDownWideShort}
            style={
              condition === "desc" && category === "date"
                ? { transform: "rotate(180deg)", transition: "0.2s" }
                : { transition: "0.2s" }
            }
          />
        </div>
        <div
          className={style.sort_button}
          onClick={() => serchClick("level")}
          style={
            category === "level"
              ? { color: "skyblue", border: "1px solid skyblue" }
              : undefined
          }
        >
          <img
            src={sort_tier_img}
            style={
              category === "level"
                ? { filter: "opacity(0.7)", transition: "0.2s" }
                : { transition: "0.2s" }
            }
          />
          <FontAwesomeIcon
            icon={faArrowDownWideShort}
            style={
              condition === "desc" && category === "level"
                ? { transform: "rotate(180deg)", transition: "0.19s" }
                : { transition: "0.19s" }
            }
          />
        </div>
        <div
          className={style.sort_button}
          onClick={() => serchClick("id")}
          style={
            category === "id"
              ? { color: "skyblue", border: "1px solid skyblue" }
              : undefined
          }
        >
          <FontAwesomeIcon
            icon={faArrowDown91}
            style={
              condition === "desc" && category === "id"
                ? { transform: "rotate(180deg)", transition: "0.2s" }
                : { transition: "0.2s" }
            }
          />
        </div>
      </div>
      <div
        className={
          hasNextPage
            ? style.problem_list
            : style.problem_list + " " + style.extra_length
        }
      >
        <hr style={{ marginTop: "10px" }} />
        {data?.pages.map((page) =>
          page.content.map((el) => <Problem key={uuidv4()} detail={el} />)
        )}
      </div>
      {hasNextPage ? (
        <Button
          content="더보기"
          style={{
            margin: "10px auto",
            backgroundColor: "#28292C",
            display: "block",
          }}
          onClick={() => fetchNextPage()}
        />
      ) : null}
      <hr />
      <div className={style.nav_header}>
        <div className={style.nav_header_tag} onClick={() => navigate("/")}>
          <div>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <span>메인페이지</span>
        </div>
        <div
          className={style.nav_header_tag}
          onClick={() => navigate("/ranking")}
        >
          <div>
            <FontAwesomeIcon icon={faTrophy} />
          </div>
          <span>랭킹</span>
        </div>
        <div
          className={style.nav_header_tag}
          onClick={() => navigate("/mypage")}
        >
          <div>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span>마이페이지</span>
        </div>
      </div>
    </div>
  );
};
