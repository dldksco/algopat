import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import { Post } from "./post/Post";
import style from "./Carousel.module.css";

export const Carousel = () => {
  // 더미 데이터 대신에 RQ를 여기서 실행
  const dumy = [
    {
      title: "혹시 백준컵 A 정해좀 알려 줄 수 있음? 내가 푼 방법은...",
      content:
        "블로그 게시물을 소개합니다. 해당 섹션을 통해 독자 및 잠재 고객과 교류할 수 있도록 최신 유행 및 관심사에 맞춰서 코딩을 계산해서 아래 코드를 제...",
      date: "2023년 4월 11일",
      viewCount: 322,
      commentCount: 33,
      likedCount: 18,
    },
    {
      title: "혹시 백준컵 B 정해좀 알려 줄 수 있음? 내가 푼 방법은...",
      content:
        "블로그 게시물을 소개합니다. 해당 섹션을 통해 독자 및 잠재 고객과 교류할 수 있도록 최신 유행 및 관심사에 맞춰서 코딩을 계산해서 아래 코드를 제...",
      date: "2023년 4월 11일",
      viewCount: 12,
      commentCount: 13,
      likedCount: 16,
    },
    {
      title: "혹시 백준컵 C 정해좀 알려 줄 수 있음? 내가 푼 방법은...",
      content:
        "블로그 게시물을 소개합니다. 해당 섹션을 통해 독자 및 잠재 고객과 교류할 수 있도록 최신 유행 및 관심사에 맞춰서 코딩을 계산해서 아래 코드를 제...",
      date: "2023년 4월 11일",
      viewCount: 532,
      commentCount: 13,
      likedCount: 10,
    },
    {
      title: "혹시 백준컵 D 정해좀 알려 줄 수 있음? 내가 푼 방법은...",
      content:
        "블로그 게시물을 소개합니다. 해당 섹션을 통해 독자 및 잠재 고객과 교류할 수 있도록 최신 유행 및 관심사에 맞춰서 코딩을 계산해서 아래 코드를 제...",
      date: "2023년 4월 11일",
      viewCount: 82,
      commentCount: 13,
      likedCount: 14,
    },
    {
      title: "혹시 백준컵 E 정해좀 알려 줄 수 있음? 내가 푼 방법은...",
      content:
        "블로그 게시물을 소개합니다. 해당 섹션을 통해 독자 및 잠재 고객과 교류할 수 있도록 최신 유행 및 관심사에 맞춰서 코딩을 계산해서 아래 코드를 제...",
      date: "2023년 4월 11일",
      viewCount: 72,
      commentCount: 13,
      likedCount: 14,
    },
  ];
  const settings = {
    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className={style.carousel}>
      <Slider {...settings}>
        {dumy.map((el) => {
          return <Post key={uuidv4()} data={el} />;
        })}
      </Slider>
    </div>
  );
};
