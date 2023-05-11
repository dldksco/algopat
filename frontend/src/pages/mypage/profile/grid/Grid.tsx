import { $ } from "@/connect/axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { Memo } from "./memo/Memo";
import { useState } from "react";
import style from "./Grid.module.css";

interface StreakData {
  userSubmitProblemCreatedAt: string;
  solvedCount: number;
}

export const Grid = () => {
  const getGrid = async () => {
    const response = await $.get("/code/grass");
    // console.log("gridASDASdasdas", response.data);
    return response.data;
  };
  const [streakDateState, setStreakDateState] = useState<string>("");
  const [streakColorState, setStreakColorState] = useState<number>(0);
  const {
    isLoading: isLoadingGrid,
    error: gridError,
    data: gridData,
  } = useQuery<StreakData[]>(["gridupdate"], getGrid);

  if (isLoadingGrid) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  let column = 53;
  let startDate = new Date("2022-02-13");
  if (gridData !== undefined && gridData.length > 0) {
    const col = gridData.length / 7;
    column = Math.floor(col) < col ? Math.floor(col) + 1 : Math.floor(col);
    startDate = new Date(gridData[0].userSubmitProblemCreatedAt);
    // console.log(column, "col");
    // console.log("startDate", startDate);
  }
  // console.log("gridData", gridData);
  // Initialize the grid with null values
  const grid = Array.from({ length: 7 }, () => Array(column).fill(-1));
  const gridDate = Array.from({ length: 7 }, () => Array(column).fill(-1));

  // console.log(startDate, "시작날짜");
  const startYear = startDate.getFullYear();
  const startWeek = Math.floor(
    (startDate.getTime() - new Date(startDate.getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDay();
  // console.log(startDate.getDay(), "요일 알려줘");
  // console.log(startDate.getDate(), "날짜알려줘");
  // console.log(startMonth, "월알려줘");
  // console.log(startDate.getFullYear(), "년알려줘");
  // Fill in the grid with the grassColor data
  if (gridData !== undefined) {
    gridData.forEach((object) => {
      const currentDate = new Date(object.userSubmitProblemCreatedAt);
      let week =
        Math.floor(
          (currentDate.getTime() - new Date(startYear, 0, 1).getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        ) - startWeek;
      const day = currentDate.getDay() % 7; //
      if (day == 6) week = week - 1;
      // console.log(day, week, grid[day][week], "확인");
      grid[day][week] = object.solvedCount;
      gridDate[day][week] = object.userSubmitProblemCreatedAt;
    });
  }
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const colors = {
    0: "#ECECEC",
    1: "#A8E4AA",
    2: "#82CB92",
    3: "#5CB17A",
    4: "#23794F",
  };

  const colorIndexFunc = (index: number) => {
    if (index <= 0) return colors[0];
    else if (index == 1) return colors[1];
    else if (index == 2) return colors[2];
    else if (index == 3 || index == 4) return colors[3];
    else if (index >= 5) return colors[4];
  };
  const handleClick = (date: string, color: number) => {
    setStreakDateState(date);
    setStreakColorState(color);
  };

  return (
    <>
      <div className={style.grid}>
        <div className={style.days}>
          {days.map((day, index) => (
            <div key={index} className={style.day}>
              {day}
            </div>
          ))}
        </div>
        <div
          className={style.grid_container}
          style={{
            gridTemplateColumns: `repeat(${column}, 15px)`,
            gridTemplateRows: "repeat(7, 15px)",
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => {
              const bgColor = colorIndexFunc(grid[rowIndex][colIndex]);
              return (
                <>
                  <div
                    style={{
                      backgroundColor: bgColor,
                      visibility:
                        grid[rowIndex][colIndex] >= 0 ? "visible" : "hidden",
                    }}
                    key={`${rowIndex}-${colIndex}`}
                    className={style.grid_cell}
                    onClick={() =>
                      handleClick(
                        gridDate[rowIndex][colIndex],
                        grid[rowIndex][colIndex]
                      )
                    }
                  />
                </>
              );
            })
          )}
        </div>
        <div className={style.gridColor_container}>
          <div className={style.gridColor_zero}>
            <div className={style.item_zero}></div>
            <div className={style.text_zero}>0</div>
          </div>
          <div className={style.gridColor_one}>
            <div className={style.item_one}></div>
            <div className={style.text_one}>1</div>
          </div>
          <div className={style.gridColor_two}>
            <div className={style.item_two}></div>
            <div className={style.text_two}>2~3</div>
          </div>
          <div className={style.gridColor_three}>
            <div className={style.item_three}></div>
            <div className={style.text_three}>4~5</div>
          </div>
          <div className={style.gridColor_four}>
            <div className={style.item_four}></div>
            <div className={style.text_four}>6이상</div>
          </div>
        </div>
      </div>
      <div className={style.memo}>
        <Memo date={streakDateState} thenum={streakColorState}></Memo>
      </div>
    </>
  );
};
