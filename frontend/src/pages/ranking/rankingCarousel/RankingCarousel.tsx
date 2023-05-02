import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

import style from "./RankingCarousel.module.css";
import "./carousel.css";
import { SelectBox } from "@/components/selectBox/SelectBox";

const MAX_LEGNTH = 30;

export const RankingCarousel = () => {
  const initData = Array.from({ length: MAX_LEGNTH }, (_, i) => {
    return {
      level: i + 1,
      center: false,
      left: false,
      right: false,
    };
  });

  const levelNumber = [
    { value: "0", name: "5" },
    { value: "1", name: "4" },
    { value: "2", name: "3" },
    { value: "3", name: "2" },
    { value: "4", name: "1" },
  ];

  const levelRank = [
    { value: "0", name: "Bronze" },
    { value: "1", name: "Silver" },
    { value: "2", name: "Gold" },
    { value: "3", name: "Platinum" },
    { value: "4", name: "Diamond" },
    { value: "5", name: "Ruby" },
  ];

  const backgroundColorFilter = (rank: number) => {
    console.log(rank);
    if (rank < 5) {
      return "#7A4613";
    } else if (5 <= rank && rank < 10) {
      return "gray";
    } else if (10 <= rank && rank < 16) {
      return "red";
    } else {
      return "black";
    }
  };

  const bj_level = [
    "Unrated",
    "Bronze V",
    "Bronze IV",
    "Bronze III",
    "Bronze II",
    "Bronze I",
    "Silver V",
    "Silver IV",
    "Silver III",
    "Silver II",
    "Silver I",
    "Gold V",
    "Gold IV",
    "Gold III",
    "Gold II",
    "Gold I",
    "Platinum V",
    "Platinum IV",
    "Platinum III",
    "Platinum II",
    "Platinum I",
    "Diamond V",
    "Diamond IV",
    "Diamond III",
    "Diamond II",
    "Diamond I",
    "Ruby V",
    "Ruby IV",
    "Ruby III",
    "Ruby II",
    "Ruby I",
  ];

  const [levelNumberSelect, setlevelNumberSelect] = useState(
    levelNumber[0].value
  );
  const [levelRankSelect, setlevelRankSelect] = useState(levelRank[0].value);
  const [levelData, setLevelData] = useState(initData);
  const [centerIndex, setCenterIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    className: style.slider,
    centerPadding: "60px",
    centerMode: true,
    infinite: true,
    speed: 350,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: (index: number) => {
      setCenterIndex(index);

      // 초기화
      setLevelData((prev) =>
        prev.map((v) => {
          return { ...v, left: false, right: false, center: false };
        })
      );

      // left
      if (index - 1 >= 0) {
        setLevelData((prev) => {
          prev[index - 1].left = true;
          return [...prev];
        });
      }

      // center
      setLevelData((prev) => {
        prev[index].center = true;
        return [...prev];
      });

      // right
      if (index + 1 < MAX_LEGNTH) {
        setLevelData((prev) => {
          prev[index + 1].right = true;
          return [...prev];
        });
      }
    },
    onInit: () => {
      const index = centerIndex;

      // center
      setLevelData((prev) => {
        prev[index].center = true;
        return [...prev];
      });

      // right
      setLevelData((prev) => {
        prev[index + 1].right = true;
        return [...prev];
      });
    },
  };

  // 셀렉트 박스 선택에 따라 슬라이드 이동
  // 랭크 선택
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slickGoTo(Number(levelRankSelect) * 5);
  }, [levelRankSelect]);
  // 숫자 선택
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slickGoTo(
      Math.floor(centerIndex / 5) * 5 + Number(levelNumberSelect)
    );
  }, [levelNumberSelect]);

  return (
    <div
      className={style.ranking_carousel}
      style={{ backgroundColor: `${backgroundColorFilter(centerIndex)}` }}
    >
      <div className={style.menu}>
        <SelectBox options={levelRank} setValue={setlevelRankSelect} />
        <SelectBox options={levelNumber} setValue={setlevelNumberSelect} />
      </div>
      <div className={style.carousel}>
        <Slider ref={sliderRef} {...settings}>
          {levelData.map((v) => {
            return (
              <div
                className={
                  style.content +
                  " " +
                  (v.left || v.right ? style.center_side : "") +
                  " " +
                  (v.center ? style.center : "")
                }
                key={uuidv4()}
              >
                <img
                  src={`https://static.solved.ac/tier_small/${v.level}.svg`}
                />
                <p>{bj_level[v.level]}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
