import { atom } from "recoil";

export interface UserInfo {
  userSeq: number;
  userProfile: string;
  userNick: string;
  userEmail: string;
  userRank: number;
}

export const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: {
    userSeq: 0,
    userProfile: "",
    userNick: "",
    userEmail: "",
    userRank: 0,
  },
});
