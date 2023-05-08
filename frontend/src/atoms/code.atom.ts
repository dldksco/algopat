import { atom } from "recoil";

export const problemOpenState = atom<boolean[]>({
  key: "problemOpenState",
  default: [],
});

export const nowProblemState = atom<number>({
  key: "nowProblemState",
  default: 11,
});
