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

/**
 *
 * %원의 %따라 동그라미 색을 정해준다.
 * @param percent : %를 입력
 * @returns
 */
export const pathColor = (percent: number) => {
  if (percent < 40) {
    return "rgba(255, 0, 0, 1)";
  } else if (percent < 80) {
    return "rgba(255, 255, 0, 1)";
  } else if (percent <= 100) {
    return "rgba(0, 255, 0, 1)";
  }
};

/**
 *
 * %원의 %따라 동그라미 배경 색을 정해준다.
 * @param percent : %를 입력
 * @returns
 */
export const backgroundColor = (percent: number) => {
  if (percent < 40) {
    return "rgba(255, 0, 0, 0.2)";
  } else if (percent < 80) {
    return "rgba(255, 255, 0, 0.2)";
  } else if (percent <= 100) {
    return "rgba(0, 255, 0, 0.2)";
  }
};

/**
 *
 * 점수에 맞춰서 높은 / 중간 / 낮은 평가를 해준다
 * @param percent : 점수 입력
 * @param state : 무슨 복잡도인지 입력
 * @returns
 */
export const estimate = (score: number, state: string) => {
  if (score < 40) {
    return `높은 ${state} 복잡도`;
  } else if (score < 80) {
    return `중간 ${state} 복잡도`;
  } else if (score <= 100) {
    return `낮은 ${state} 복잡도`;
  }
};
