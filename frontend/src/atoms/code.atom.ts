import { atom } from "recoil";

export const problemOpenState = atom({
  key: "problemOpenState",
  default: {},
});

export const nowProblemSubmissionIdState = atom({
  key: "nowProblemSubmissionIdState",
  default: {
    problemTitle: "",
    problemId: -1,
    problemLevel: -1,
    submissionId: -1,
  },
});
