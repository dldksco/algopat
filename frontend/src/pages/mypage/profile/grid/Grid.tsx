import style from "./Grid.module.css";
import type { Properties } from "csstype";

interface GridProps {
  startColumn: number;
  grassColor: number[];
}

type TableStyles = {
  borderCollapse: Properties["borderCollapse"];
  borderSpacing: string;
};

export const Grid = (props: GridProps) => {
  const { grassColor } = props;
  const greenColors = ["FFFFFF", "#008000", "#00FF00", "#32CD32", "#90EE90"];
  let index = 0;
  const rows = [];
  for (let row = 0; row < 7; row++) {
    const cells = [];
    for (let col = 0; col < 53; col++) {
      const value = grassColor[row * 53 + col];
      if (value == 0) {
        index = 0;
      } else if (value <= 2) {
        index = 1;
      } else if (value <= 4) {
        index = 2;
      } else {
        index = 3;
      }
      const cellStyle = {
        backgroundColor: greenColors[index],
      };
      cells.push(<td key={col} className={style.cell} style={cellStyle} />);
    }
    rows.push(<tr key={row}>{cells}</tr>);
  }
  const tableStyles: TableStyles = {
    borderCollapse: "separate", // separate the borders of each cell
    borderSpacing: "10px", // add a gap of 10px between each cell
  };

  //   const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  return (
    <>
      <div className={style.container}>
        <table className={style.table}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
};
