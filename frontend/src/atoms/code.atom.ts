import { atom } from "recoil";

export const problemOpenState = atom<boolean[]>({
  key: "problemOpenState",
  default: [],
});
