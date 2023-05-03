import { atom } from 'recoil';

export type recentItem = "text" | "comment" | "recommend" | "alarm";

export const prevSelectedState = atom<recentItem>({
  key: 'prevSelectedState',
  default: "text",
});