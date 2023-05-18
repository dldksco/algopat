import { Problem } from "@/types/type";
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

export const problemInfoState = atom<Problem>({
  key: "problemInfoState",
  default: {
    problemId: "",
    problemTitle: "",
    problemLevel: "",
    problemDesc: "",
    problemInput: "",
    problemOutput: "",
    problemTagList: [],
    problemLimit: "",
    problemTimeLimit: "",
    problemSpaceLimit: "",
  },
});
