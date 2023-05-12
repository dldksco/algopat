import { atom } from "recoil";

export const toekenForDetailState = atom({
  key: "toekenForDetailState",
  default: "",
});

export const isCodeNavOpenState = atom({
  key: "isCodeNavOpenState",
  default: false,
});

export const nowProblemSubmissionIdState = atom({
  key: "nowProblemSubmissionIdState",
  default: {
    problemTitle: "",
    problemId: 0,
    problemLevel: 0,
    submissionId: 0,
    nowProcess: false,
  },
});
