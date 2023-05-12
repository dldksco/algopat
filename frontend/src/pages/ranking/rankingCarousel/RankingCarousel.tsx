import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

import { SelectBox } from "@/components/selectBox/SelectBox";
import { backgroundColorFilter } from "../hooks/func";
import { bj_level } from "@/variable/variable";
import { useRecoilState } from "recoil";
import { centerIndexState } from "@/atoms/ranking.atom";

import style from "./RankingCarousel.module.css";
import "./carousel.css";
import { isMobile } from "@/pages/main/hooks/func";

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

  const [levelNumberSelect, setlevelNumberSelect] = useState(
    levelNumber[0].value
  );
  const [levelRankSelect, setlevelRankSelect] = useState(levelRank[0].value);
  const [levelData, setLevelData] = useState(initData);
  const [centerIndex, setCenterIndex] = useRecoilState(centerIndexState);
  // const [centerIndex, setCenterIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const onInitCallback = () => {
    const index = centerIndex;

    // console.log("center ", index);

    // sliderRef.current?.slickGoTo(index);
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
  };

  const changeCallback = (old: number, index: number) => {
    setCenterIndex(index);

    //selectbox 초기화
    setlevelRankSelect(Math.floor(index / 5).toString());
    setlevelNumberSelect(Math.floor(index % 5).toString());

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
  };

  const settings: Settings = {
    className: style.slider,
    // focusOnSelect: true,
    infinite: true,
    speed: 350,
    slidesToShow: isMobile() ? 1 : 5,
    centerMode: true,
    centerPadding: "80px",
    // afterChange: afterChangeCallback,
    swipeToSlide: true,
    beforeChange: changeCallback,
    onInit: onInitCallback,
    // onReInit: onInitCallback,
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
      Number(levelRankSelect) * 5 + Number(levelNumberSelect)
    );
  }, [levelNumberSelect]);

  return (
    <div
      className={style.ranking_carousel}
      style={{ backgroundColor: `${backgroundColorFilter(centerIndex)}` }}
    >
      <div className={style.menu}>
        <SelectBox
          options={levelRank}
          setValue={setlevelRankSelect}
          value={levelRankSelect}
        />
        <SelectBox
          options={levelNumber}
          setValue={setlevelNumberSelect}
          value={levelNumberSelect}
        />
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
                <p>{v.center ? bj_level[v.level] : ""}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
