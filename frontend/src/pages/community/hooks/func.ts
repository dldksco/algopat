/**
 *
 * 현재 기기의 종류를 판별해 준다.
 * @returns : 모바일기기인지 확인해서 boolean 출력
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
