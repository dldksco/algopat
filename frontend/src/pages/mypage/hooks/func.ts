import { colors } from "./gridtype";

 /**
 * 제출 카운트에 따라 색깔 넘버링
 */
export const colorIndexFunc = (index: number) => {
  if (index <= 0) return colors[0];
  else if (index == 1) return colors[1];
  else if (index == 2) return colors[2];
  else if (index == 3 || index == 4) return colors[3];
  else if (index >= 5) return colors[4];
};