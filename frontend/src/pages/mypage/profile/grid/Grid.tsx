import style from "./Grid.module.css";

type GrassColorData = {
  date: string;
  color: number;
};

export interface Data {
  startDate: string;
  grassColor: GrassColorData[];
}

const data: Data = {
  startDate: "2023-02-13",
  grassColor: [
    { date: "2023-02-13", color: 2 },
    { date: "2023-02-14", color: 1 },
    { date: "2023-02-15", color: 6 },
    // ...
  ],
};

const date11 = new Date(data.startDate);
console.log(date11.toLocaleDateString, "날짜알려줘");
console.log(date11.getDay(), "날짜알려줘");
export function Grid() {
  // Initialize the grid with null values
  const grid = Array.from({ length: 7 }, () => Array(53).fill(null));

  // Fill in the grid with the grassColor data
  data.grassColor.forEach(({ date, color }) => {
    const currentDate = new Date(date);
    const week = Math.floor(
      (currentDate.getTime() -
        new Date(currentDate.getFullYear(), 0, 1).getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
    const day = (currentDate.getDay() + 6) % 7; // Monday is 0, Sunday is 6
    grid[day][week] = color;
  });

  const days = ["Sun", "Mon", "Tues", "Wed", "Thrs", "Fri", "Sat"];
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
          row.map((col, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={style.grid_cell} />
          ))
        )}
      </div>
    </div>
  );
}
