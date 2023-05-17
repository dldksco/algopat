import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { Memo } from "./memo/Memo";
import { useState } from "react";
import { getGrid } from "../../hooks/query";
import { v4 as uuidv4 } from "uuid";
import { colors, days, months, monthsWeight } from "../../hooks/gridtype";
import { colorIndexFunc } from "../../hooks/func";
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
  console.log(gridData, "grid 내놔");
  let column = 53;
  let startDate = new Date("2022-02-13");
  let maxCount = 1;
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
      if (object.solvedCount > maxCount) maxCount = object.solvedCount;
      grid[day][week] = object.solvedCount;
      gridDate[day][week] = object.userSubmitProblemCreatedAt;
    });
  }

  const handleClick = (date: string, color: number) => {
    setStreakDateState(date);
    setStreakColorState(color);
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
                const bgColor = colorIndexFunc(
                  grid[rowIndex][colIndex],
                  maxCount
                );
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
                  >
                    <div
                      className={style.cell_hover}
                      style={{ left: -2 * colIndex }}
                    >
                      {gridDate[rowIndex][colIndex]}: {grid[rowIndex][colIndex]}
                      문제 제출
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className={style.gridColor_container}>
          <div className={style.gridColor_zero}>
            <div
              className={style.item_zero}
              style={{ backgroundColor: `${colors[0]}` }}
            ></div>
            <div className={style.text_zero}>0</div>
          </div>
          <div
            className={style.gridColor_one}
            style={{ display: maxCount >= 4 ? "flex" : "none" }}
          >
            <div className={style.item_one}></div>
            <div
              className={style.text_one}
              style={{ backgroundColor: `${colors[1]}` }}
            >
              1{Math.floor(maxCount / 4) > 1 ? "~" : null}
              {Math.floor(maxCount / 4) > 1 ? Math.floor(maxCount / 4) : null}
            </div>
          </div>
          <div
            className={style.gridColor_two}
            style={{ display: maxCount >= 3 ? "flex" : "none" }}
          >
            <div className={style.item_two}></div>
            <div
              className={style.text_two}
              style={{ backgroundColor: `${colors[2]}` }}
            >
              {Math.floor(maxCount / 4) + 1}
              {Math.floor(maxCount / 2) - Math.floor(maxCount / 4) > 1
                ? "~"
                : null}
              {Math.floor(maxCount / 2) - Math.floor(maxCount / 4) > 1
                ? Math.floor(maxCount / 2)
                : null}
            </div>
          </div>
          <div
            className={style.gridColor_three}
            style={{ display: maxCount >= 2 ? "flex" : "none" }}
          >
            <div
              className={style.item_three}
              style={{ backgroundColor: `${colors[3]}` }}
            ></div>
            <div className={style.text_three}>
              {Math.floor(maxCount / 2)}
              {Math.floor((maxCount / 4) * 3) - Math.floor(maxCount / 2) > 1
                ? "~"
                : null}
              {Math.floor((maxCount / 4) * 3) - Math.floor(maxCount / 2) > 1
                ? Math.floor((maxCount / 4) * 3)
                : null}
            </div>
          </div>
          <div className={style.gridColor_four}>
            <div
              className={style.item_four}
              style={{ backgroundColor: `${colors[4]}` }}
            ></div>
            <div className={style.text_four}>
              {Math.floor((maxCount / 4) * 3) + 1}
              {maxCount - Math.floor((maxCount / 4) * 3) > 1 ? "~" : null}
              {maxCount - Math.floor((maxCount / 4) * 3) > 1 ? maxCount : null}
            </div>
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
