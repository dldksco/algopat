import { $ } from "@/connect/axios";

import style from "./Grid.module.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";

type GrassColorData = {
  date: string;
  color: number;
};

interface StreakData {
  userSubmitProblemCreatedAt: string;
  solvedCount: number;
}

export interface Data {
  grassColor: GrassColorData[];
}

const data: Data = {
  grassColor: [
    { date: "2023-02-13", color: 2 },
    { date: "2023-02-14", color: 1 },
    { date: "2023-02-15", color: 6 },
    { date: "2023-02-16", color: 1 },
    { date: "2023-02-17", color: 2 },
    { date: "2023-02-18", color: 3 },
    { date: "2023-02-19", color: 4 },
    { date: "2023-02-20", color: 2 },
    { date: "2023-02-21", color: 3 },
    { date: "2023-02-22", color: 5 },
    { date: "2023-02-23", color: 1 },
    { date: "2023-02-24", color: 3 },
    { date: "2023-02-25", color: 5 },
    { date: "2023-02-26", color: 2 },
    { date: "2023-02-27", color: 1 },
    { date: "2023-02-28", color: 6 },
  ],
};
const col = data.grassColor.length / 7;
const column = Math.floor(col) < col ? Math.floor(col) + 1 : Math.floor(col);
// console.log(column, "col");
const startDate = new Date(data.grassColor[0].date);
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

export function Grid() {
  const getGrid = async () => {
    const response = await $.get("/code/grass");
    console.log("gridASDASdasdas", response.data);
    return response.data;
  };

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

  console.log("gridData", gridData);
  // Initialize the grid with null values
  const grid = Array.from({ length: 7 }, () => Array(53).fill(-1));

  // Fill in the grid with the grassColor data
  if (gridData !== undefined) {
    gridData.forEach((object) => {
      const currentDate = new Date(object.userSubmitProblemCreatedAt);
      const week =
        Math.floor(
          (currentDate.getTime() - new Date(startYear, 0, 1).getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        ) - startWeek;
      const day = (currentDate.getDay() + 6) % 7; // Monday is 0, Sunday is 6
      grid[day][week] = object.solvedCount;
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
    0: "#FFFFFF",
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

  const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return (
    <div className={style.grid}>
      <div className={style.days}>
        {days.map((day, index) => (
          <div key={index} className={style.day}>
            {day}
          </div>
        ))}
      </div>
      <div className={style.grid_container}>
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            const bgColor = colorIndexFunc(grid[rowIndex][colIndex]);
            return (
              <div
                style={{
                  backgroundColor: bgColor,
                }}
                key={`${rowIndex}-${colIndex}`}
                className={style.grid_cell}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
