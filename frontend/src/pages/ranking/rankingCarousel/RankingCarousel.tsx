import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

import { SelectBox } from "@/components/selectBox/SelectBox";
import { backgroundColorFilter } from "../hooks/func";
import { bj_level } from "@/variable/variable";
import { useRecoilState } from "recoil";
import {
  centerIndexState,
  levelNumberSelectState,
  levelRankSelectState,
} from "@/atoms/ranking.atom";

import style from "./RankingCarousel.module.css";
import "./carousel.css";
import { isMobile } from "@/pages/main/hooks/func";

const MAX_LEGNTH = 35;

export const RankingCarousel = () => {
  const initData = Array.from({ length: MAX_LEGNTH }, (_, i) => {
    return {
      level: i,
      center: false,
      left: false,
      right: false,
    };
  });

  const levelRank = [
    { value: "-1", name: "All" },
    { value: "0", name: "Bronze" },
    { value: "1", name: "Silver" },
    { value: "2", name: "Gold" },
    { value: "3", name: "Platinum" },
    { value: "4", name: "Diamond" },
    { value: "5", name: "Ruby" },
  ];

  const levelNumber = [
    { value: "0", name: "5" },
    { value: "1", name: "4" },
    { value: "2", name: "3" },
    { value: "3", name: "2" },
    { value: "4", name: "1" },
  ];

  const [levelNumberSelect, setlevelNumberSelect] = useRecoilState(
    levelNumberSelectState
  );
  const [levelRankSelect, setlevelRankSelect] =
    useRecoilState(levelRankSelectState);
  const [levelData, setLevelData] = useState(initData);
  const [once, setOnce] = useState(false);

  const [centerIndex, setCenterIndex] = useRecoilState(centerIndexState);
  // const [centerIndex, setCenterIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const onInitCallback = () => {
    const index = centerIndex;
    setCenterIndex(index);
    setOnce(true);

    //selectbox 현재 위치에 맞게 수정
    if (index === 0) {
      setlevelRankSelect("-1");
      setlevelNumberSelect("0");
    } else {
      setlevelRankSelect(Math.floor((index - 1) / 5).toString());
      setlevelNumberSelect(Math.floor((index - 1) % 5).toString());
    }
    // left
    if (index - 1 >= 0) {
      setLevelData((prev) => {
        prev[index - 1].left = true;
        return [...prev];
      });
    } else {
      setLevelData((prev) => {
        prev[MAX_LEGNTH - 1].left = true;
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
    } else {
      setLevelData((prev) => {
        prev[0].right = true;
        return [...prev];
      });
    }
  };

  const changeCallback = (index: number) => {
    // console.log("center ", index);
    setCenterIndex(index);
    setOnce(true);

    //selectbox 현재 위치에 맞게 수정
    if (index === 0) {
      setlevelRankSelect("-1");
      setlevelNumberSelect("0");
    } else {
      setlevelRankSelect(Math.floor((index - 1) / 5).toString());
      setlevelNumberSelect(Math.floor((index - 1) % 5).toString());
    }
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
    } else {
      setLevelData((prev) => {
        prev[MAX_LEGNTH - 1].left = true;
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
    } else {
      setLevelData((prev) => {
        prev[0].right = true;
        return [...prev];
      });
    }
  };

  const settings: Settings = {
    className: style.slider,
    initialSlide: centerIndex,
    focusOnSelect: true,
    infinite: false,
    speed: 350,
    slidesToShow: isMobile() ? 1 : 5,
    centerMode: true,
    centerPadding: "80px",
    afterChange: changeCallback,
    swipeToSlide: true,
    // beforeChange: changeCallback,
    onInit: onInitCallback,
    // onReInit: onInitCallback,
  };

  // 셀렉트 박스 선택에 따라 슬라이드 이동
  // 랭크 선택
  useEffect(() => {
    if (!sliderRef.current || !once) return;

    if (levelRankSelect == "-1") {
      sliderRef.current.slickGoTo(0);
      changeCallback(0);
    } else {
      sliderRef.current.slickGoTo(Number(levelRankSelect) * 5 + 1);
      changeCallback(Number(levelRankSelect) * 5 + 1);
    }
  }, [levelRankSelect]);

  // 숫자 선택
  useEffect(() => {
    if (!sliderRef.current || !once) return;
    sliderRef.current.slickGoTo(
      Number(levelRankSelect) * 5 + 1 + Number(levelNumberSelect)
    );
    changeCallback(
      Math.max(Number(levelRankSelect) * 5 + 1 + Number(levelNumberSelect), 0)
    );
  }, [levelNumberSelect]);

  return (
    <div
      className={style.ranking_carousel}
      style={{
        backgroundColor: `${backgroundColorFilter(centerIndex)}`,
        animation: "top_down_effect 0.5s",
      }}
    >
      <div className={style.menu}>
        <SelectBox
          options={levelRank}
          setValue={setlevelRankSelect}
          value={levelRankSelect}
        />
        {levelRankSelect != "-1" ? (
          <SelectBox
            options={levelNumber}
            setValue={setlevelNumberSelect}
            value={levelNumberSelect}
          />
        ) : null}
      </div>
      <div
        className={style.carousel}
        style={
          levelRankSelect == "-1" ? { border: "1px solid white" } : undefined
        }
      >
        <Slider ref={sliderRef} {...settings}>
          {levelData.map((v, i) => {
            if (i < 31) {
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
            } else {
              return <div key={uuidv4()}></div>;
            }
          })}
        </Slider>
      </div>
    </div>
  );
};
