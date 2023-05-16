export const backgroundColorFilter = (rank: number) => {
  if (0 === rank) {
    return "black";
  } else if (1 <= rank && rank < 6) {
    return "#7A4613";
  } else if (6 <= rank && rank < 11) {
    return "#24415C";
  } else if (11 <= rank && rank < 16) {
    return "#CB8400";
  } else if (16 <= rank && rank < 21) {
    return "#1EC08B";
  } else if (21 <= rank && rank < 26) {
    return "#008CC3";
  } else {
    return "#CD004F";
  }
};
