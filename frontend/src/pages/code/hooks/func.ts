/**
 *
 * 너무 긴 문자열 앞부분만 보여주기
 * @param str : 자를 문자열
 * @param num : 자를 갯수
 * @returns
 */

export const stringCutter = (str: string, num: number) =>
  str.slice(0, num) + (str.length > num ? "..." : "");

/**
 *
 * 천의 자리마다 컴마 찍기
 * @returns
 */
export const addCommas = (num: string | number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
