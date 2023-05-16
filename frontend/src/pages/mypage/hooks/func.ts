import { colors } from "./gridtype";

 /**
 * 제출 카운트에 따라 색깔 넘버링
 */
export const colorIndexFunc = (index: number, maxIndex: number) => {
    const firstIndex = Math.floor(maxIndex/4);
    const secondIndex = Math.floor(maxIndex/2);
    const thirdIndex = Math.floor(maxIndex/4*3);  
if (index <= 0) return colors[0];
  else if (maxIndex >=4 && index <=firstIndex) return colors[1];
  else if (maxIndex >=3 && index <=secondIndex) return colors[2];
  else if (maxIndex >=2 && index <= thirdIndex) return colors[3];
  else return colors[4];
};