import style from './Grid.module.css';

type GrassColorData = {
  date: string;
  color: number;
};

interface Data {
  startRow: number;
  grassColor: GrassColorData[];
}

const data: Data = {
  startRow: 3,
  grassColor: [
    { date: '2022-02-13', color: 2 },
    { date: '2022-02-14', color: 1 },
    { date: '2022-02-15', color: 6 },
    // ...
  ],
};

export function Grid() {
  // Initialize the grid with null values
  const grid = Array.from({ length: 7 }, () => Array(53).fill(null));

  // Fill in the grid with the grassColor data
  data.grassColor.forEach(({ date, color }) => {
    const currentDate = new Date(date);
    const week = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    const day = (currentDate.getDay() + 6) % 7; // Monday is 0, Sunday is 6 
    grid[day][week] = color;
  });

  return (
    <div className={style.grid}>
      <div className={style.grid_container}>
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`} className={style.grid_cell} />
          )),
        )}
      </div>
    </div>
  );
}