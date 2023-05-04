import { SetterOrUpdater, atom } from "recoil";
import { Buffer } from "buffer";

export interface UserInfo {
  userSeq: number;
  userProfile: string;
  userGithubId: string;
  userEmail: string;
  userRank: number;
}

export const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: {
    userSeq: 0,
    userProfile: "",
    userGithubId: "",
    userEmail: "",
    userRank: 0,
  },
});

export const loginUser = (setUserInfo: SetterOrUpdater<UserInfo>) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    const result = JSON.parse(payload.toString());
    console.log("이것이 토큰결과");
    console.log(result);

    setUserInfo({
      userSeq: 1,
      userProfile: "-",
      userGithubId: "라면부엉",
      userEmail: "부엉이@부엉부엉",
      userRank: 17,
    });

    // setUserInfo({
    //   userSeq: result.number,
    //   userProfile: result.userProfile,
    //   userGithubId: result.userGithubId,
    //   userEmail: result.userEmail,
    //   userRank: result.userRank,
    // });
  }
};
