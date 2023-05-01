import { Pagenation } from "@/components/pagenation/Pagenation";
import { Carousel } from "./carousel/Carousel";
import { CommunityBoard } from "./communityBoard/CommunityBoard";
import { useLocation } from "react-router-dom";
import style from "./List.module.css";
import { Button } from "@/components/button/Button";
import { ListSearch } from "./listSearch/ListSearch";

export const List = () => {
  // 페이지를 리랜더링과 동시에 pageNum과 search검색어를 url에서 추출한다.
  // 해당 데이터를 사용해서 useQuery를 사용하자
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const search = searchParams.get("search") || "";

  // 더미 데이터
  const dumy1 = [
    {
      title: "공지사항1 입니다",
      writer: "운영자",
      likeCount: 14,
      date: "2023-01-01",
    },
    {
      title: "공지사항2 입니다",
      writer: "운영자",
      likeCount: 15,
      date: "2023-01-01",
    },
    {
      title: "공지사항3 입니다",
      writer: "운영자",
      likeCount: 16,
      date: "2023-01-01",
    },
  ];
  const dumy2 = [
    {
      title:
        "게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
    {
      title: "게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
    {
      title: "게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
    {
      title: "게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
    {
      title: "게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
    {
      title: "게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
    {
      title: "게시글 내용입니다",
      writer: "글쓴이1",
      likeCount: 32,
      date: "2023-01-01",
    },
  ];

  return (
    <div className={style.list}>
      <Carousel />
      {/* 공지사항 Top3 + HeadRow */}
      <div className={style.board_components}>
        <CommunityBoard
          headRow={["제목", "글쓴이", "추천", "날짜"]}
          grid="60% 15% 15% 10%"
          data={dumy1}
          color={"rgb(119, 169, 255)"}
        />
        <CommunityBoard data={dumy2} grid="60% 15% 15% 10%" />
        <Button
          content="글쓰기"
          onClick={() => {}}
          style={{ float: "right", marginTop: "15px", marginRight: "4%" }}
        />
        <div style={{ clear: "both" }} />
      </div>
      <Pagenation first={true} last={true} />
      <ListSearch url={"algopat/url"} />
    </div>
  );
};
