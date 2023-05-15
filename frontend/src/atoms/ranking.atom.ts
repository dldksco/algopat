import { RankingDetailParam } from "@/types/type";
import { atom } from "recoil";

export const centerIndexState = atom<number>({
  key: "centerIndexState",
  default: 0,
});

export const levelRankSelectState = atom<string>({
  key: "levelRankSelectState",
  default: "-1",
});

export const levelNumberSelectState = atom<string>({
  key: "levelNumberSelectState",
  default: "0",
});

export const rankingDetailState = atom<RankingDetailParam>({
  key: "rankingDetailState",
  default: {
    problemId: 0,
    pagenumber: 1,
    languagefilter: "",
    sortcriteria: "",
    defaultvalue: "",
  },
});
