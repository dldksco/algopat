export const backgroundColorFilter = (rank: number) => {
  if (rank < 5) {
    return "#7A4613";
  } else if (5 <= rank && rank < 10) {
    return "#24415C";
  } else if (10 <= rank && rank < 15) {
    return "#CB8400";
  } else if (15 <= rank && rank < 20) {
    return "#1EC08B";
  } else if (20 <= rank && rank < 25) {
    return "#008CC3";
  } else {
    return "#CD004F";
  }
};
