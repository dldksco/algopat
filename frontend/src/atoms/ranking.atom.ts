import { RankingDetailParam } from "@/types/type";
import { atom } from "recoil";

export const centerIndexState = atom<number>({
  key: "centerIndexState",
  default: 0,
});

export const rankingDetailState = atom<RankingDetailParam>({
  key: "rankingDetailState",
  default: {
    problemId: 0,
    pagenumber: 0,
    languagefilter: "",
    sortcriteria: "",
    defaultvalue: "",
  },
});
