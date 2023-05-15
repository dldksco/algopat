import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { Memo } from "./memo/Memo";
import { useState } from "react";
import { getGrid } from "../../hooks/query";
import { v4 as uuidv4 } from "uuid";
import { colors, days, months, monthsWeight } from "../../hooks/gridtype";
import style from "./Grid.module.css";

export const Grid = () => {
  const [streakDateState, setStreakDateState] = useState<string>("");
  const [streakColorState, setStreakColorState] = useState<number>(0);
  const {
    isLoading: isLoadingGrid,
    error: gridError,
    data: gridData,
  } = getGrid();

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
  }
  const grid = Array.from({ length: 7 }, () => Array(column).fill(-1));
  const gridDate = Array.from({ length: 7 }, () => Array(column).fill(-1));
  const startYear = startDate.getFullYear();
  const startWeek = Math.floor(
    (startDate.getTime() - new Date(startDate.getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  const startMonth = startDate.getMonth();
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
      grid[day][week] = object.solvedCount;
      gridDate[day][week] = object.userSubmitProblemCreatedAt;
    });
  }

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
    console.log(date);
  };

  return (
    <>
      <div className={style.grid}>
        <div className={style.days}>
          {days.map((day, index) => (
            <div key={uuidv4()} className={style.day}>
              {day}
            </div>
          ))}
        </div>
        <div className={style.grid_family}>
          <div className={style.months}>
            {months.map((_, i) => {
              const index = (startMonth + i) % 12;
              return (
                <div
                  key={uuidv4()}
                  style={{ marginRight: `${monthsWeight[index]}px` }}
                  className={style.month}
                >
                  {months[index]}
                </div>
              );
            })}
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
                  <div
                    style={{
                      backgroundColor: bgColor,
                      visibility:
                        grid[rowIndex][colIndex] >= 0 ? "visible" : "hidden",
                    }}
                    key={uuidv4()}
                    className={style.grid_cell}
                    onClick={() =>
                      handleClick(
                        gridDate[rowIndex][colIndex],
                        grid[rowIndex][colIndex]
                      )
                    }
                  />
                );
              })
            )}
          </div>
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
        {streakColorState === 0 ? null : (
          <p>{streakDateState} 내가 푼 문제 목록</p>
        )}
        {streakColorState === 0 ? null : (
          <Memo date={streakDateState} thenum={streakColorState}></Memo>
        )}
      </div>
    </>
  );
};
