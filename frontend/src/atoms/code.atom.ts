import { atom } from "recoil";

export const problemOpenState = atom({
  key: "problemOpenState",
  default: {},
});

export const nowProblemSubmissionIdState = atom({
  key: "nowProblemSubmissionIdState",
  default: {
    problemTitle: "동해물과백두산이마르고닳",
    problemId: 16236,
    problemLevel: 21,
    submissionId: 48210181,
  },
});
