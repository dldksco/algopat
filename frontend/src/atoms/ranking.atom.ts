import { atom } from "recoil";

export const centerIndexState = atom<number>({
  key: "centerIndexState",
  default: 0,
});
