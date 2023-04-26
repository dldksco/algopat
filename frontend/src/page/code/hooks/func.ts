
/**
 * 
 * 너무 긴 문자열 앞부분만 보여주기
 * @param title : 자를 문자열
 * @param num : 자를 갯수
 * @returns 
 */

  export const stringCutter = (title: string, num: number) => title.slice(0, num) + (title.length > num ? "..." : "");
  