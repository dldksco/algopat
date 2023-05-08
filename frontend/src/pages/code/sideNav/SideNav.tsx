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
import { Problem, ProblemProps } from "./problem/Problem";
import style from "./SideNav.module.css";
import { $ } from "@/connect/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { distanceBetweenPoints } from "chart.js/helpers";
import { useState } from "react";

export const SideNav = ({
  setIsSidenavOpen,
}: {
  setIsSidenavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //const isOpen = [false, false, false, false, false];
  const [page, setPage] = useState<number>(0);

  const fetchData = async (page: number) => {
    const response = await $.get(`/code/problem/submission/${page}`);
    console.log(response.data.content, "content 확인");
    return response.data;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    ["sideBar"],
    ({ pageParam = 0 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      initialData: { pages: [{ content: [], nextPage: 0 }], pageParams: [] },
    }
  );
  // if (isLoading) {
  //   return <div>asdasd</div>;
  // // }
  // console.log(data?.pages, "data 확인 찐");
  // console.log(data?.pages[page].content, "content 확인 찐");
  console.log(hasNextPage, "다음페이지 있니");
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchNextPage({ pageParam: page + 1 });
    console.log(page, "pagenum");
  };
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
      {data?.pages[0].content === undefined
        ? null
        : data?.pages[0].content.map((el: Problem) => (
            <Problem key={uuidv4()} data={el} />
          ))}
      <hr />
      {!isFetchingNextPage && hasNextPage ? (
        <Button
          content="더보기"
          style={{
            margin: "20px auto",
            backgroundColor: "#28292C",
            display: "block",
          }}
          onClick={handleLoadMore}
        />
      ) : null}
      <hr />
      <div className={style.nav_header}>
        <div className={style.nav_header_tag}>
          <div onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <span onClick={() => navigate("/")}>메인페이지</span>
        </div>
        <div className={style.nav_header_tag}>
          <div onClick={() => navigate("/ranking")}>
            <FontAwesomeIcon icon={faTrophy} />
          </div>
          <span onClick={() => navigate("/ranking")}>랭킹</span>
        </div>
        <div className={style.nav_header_tag}>
          <div onClick={() => navigate("/mypage")}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span onClick={() => navigate("/mypage")}>마이페이지</span>
        </div>
      </div>
    </div>
  );
};
