import { atom } from "recoil";

export interface TierInfo {
  tier: number;
  userId: string;
  isAuthorized: boolean;
}

export const authorizedAtom = atom({
    key: 'authorized',
    default: {
      tier: -1,
      userId: "-1",
      isAuthorized:false,
    },
  });