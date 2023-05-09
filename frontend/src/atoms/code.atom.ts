import { atom } from "recoil";

export const problemOpenState = atom<boolean[]>({
  key: "problemOpenState",
  default: [],
});

export const nowProblemSubmissionIdState = atom<number>({
  key: "nowProblemSubmissionIdState",
  default: 57895197,
});
