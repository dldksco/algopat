import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";

import style from "./RankingCarousel.module.css";

export const RankingCarousel = () => {
  // 더미 데이터 대신에 RQ를 여기서 실행
  const levelData = Array.from({ length: 31 }, (_, i) => {
    return {
      level: i,
    };
  });

  const settings = {
    centerPadding: "60px",
    centerMode: true,
    infinite: false,
    speed: 350,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className={style.carousel}>
      <Slider {...settings}>
        {levelData.map((v) => {
          return (
            <div className={style.content} key={uuidv4()}>
              <img src={`https://static.solved.ac/tier_small/${v.level}.svg`} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
