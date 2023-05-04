import { Button } from "@/components/button/Button";
import { v4 as uuidv4 } from "uuid";
import { TextForm } from "./textform/TextForm";
import style from "./TextMenu.module.css";
import { Pagenation } from "@/components/pagenation/Pagenation";
import { CheckBox } from "../../checkbox/CheckBox";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const TextMenu = () => {
  // 애니메이션 1: 이전 메뉴 불러오기
  const [allCheckStates, setAllCheckStates] = useState<boolean>();
  const [checkboxStates, setCheckBoxStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]); // 초기값 빈 값 으로 나와있는데 false 필요하면 초기화
  const checkBoxRefs = useRef<(React.RefObject<HTMLInputElement> | null)[]>([]);

  const checkBoxChangeCallBack = (index: number, isChecked: boolean) => {
    const updatedCheckBoxStates = [...checkboxStates];
    updatedCheckBoxStates[index] = isChecked;
    setCheckBoxStates(updatedCheckBoxStates);
    console.log(updatedCheckBoxStates, "하는일 확인");
  };

  const allCheckBoxCallBack = (isChecked: boolean) => {
    console.log("다 체크하라고", isChecked);

    setAllCheckStates(isChecked);
    // const updatedCheckBoxStates = [...checkboxStates];
    // console.log(isChecked);
    // updatedCheckBoxStates.map((el) => isChecked);
    // console.log(updatedCheckBoxStates, "다 체크했어?");
    setCheckBoxStates((prev) => [...prev.map((el) => isChecked)]);
  };
  useLayoutEffect(() => {
    const allChecked = checkboxStates.every((isChecked) => isChecked);
    console.log(allChecked, "allchecked");
    console.log(checkboxStates);
    setAllCheckStates(allChecked);
  }, [checkboxStates]);

  const dummyData = [
    {
      title: "[백준1] 배열 돌리기 5 매우 쉽게 잘 푸는 법",
      date: "2020.02.21",
      views: 20,
    },
    {
      title: "[백준2] 배열 돌리기 5 매우 쉽게 잘 푸는 법",
      date: "2020.02.23",
      views: 30,
    },
    {
      title: "[백준3] 배열 돌리기 5 매우 쉽게 잘 푸는 법",
      date: "2020.02.24",
      views: 21,
    },
    {
      title: "[백준4] 배열 돌리기 5 매우 쉽게 잘 푸는 법",
      date: "2020.02.24",
      views: 21,
    },
  ];
  return (
    <>
      <div className={style.description}>
        <span>n개의 작성한 글이 있습니다.</span>
        <div className={style.buttonContainer}>
          <Button
            className={style.deleteButton}
            content="삭제"
            onClick={() => {}}
          ></Button>
        </div>
      </div>
      <div className={style.context}>
        <div className={style.checkbox}>
          <input
            type="checkbox"
            checked={allCheckStates}
            onChange={(event) => allCheckBoxCallBack(event.target.checked)}
          />
        </div>
        <div className={style.title}>제목</div>
        <div className={style.date}>작성일</div>
        <div className={style.views}>조회수</div>
      </div>
      {dummyData.map((el, index) => (
        <CheckBox
          key={uuidv4()}
          index={index}
          boardContent={el}
          checked={checkboxStates[index] || false}
          onChange={(isChecked) => checkBoxChangeCallBack(index, isChecked)}
        />
      ))}
      <Pagenation first={false} last={false} number={3} totalPages={32} />
    </>
  );
};
