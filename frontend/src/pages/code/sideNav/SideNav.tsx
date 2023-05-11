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
import style from "./SideNav.module.css";

export const SideNav = ({
  setIsSidenavOpen,
}: {
  setIsSidenavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, fetchNextPage, hasNextPage } = getInfinityProblemList();
  const navigate = useNavigate();
  const xButtonClick = () => setIsSidenavOpen(false);

  return (
    <div className={style.sideNav}>
      <p>코드 분석</p>
      <div className={style.x_button} onClick={xButtonClick}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>

      <div className={style.sort_button_group}>
        <div className={style.sort_button}>
          <FontAwesomeIcon icon={faClock} />
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </div>
        <div className={style.sort_button}>
          <img src={sort_tier_img} />
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </div>
        <div className={style.sort_button}>
          <FontAwesomeIcon icon={faArrowDown91} />
        </div>
      </div>
      <div
        className={
          hasNextPage
            ? style.problem_list
            : style.problem_list + " " + style.extra_length
        }
      >
        {data?.pages.map((page) =>
          page.content.map((el) => <Problem key={uuidv4()} detail={el} />)
        )}
        <hr />
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
