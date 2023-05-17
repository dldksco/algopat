import { PagableResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { profileState } from "@/atoms/user.atom";

interface StreakData {
  userSubmitSolutionTime: string;
  solvedCount: number;
}
export interface problemByDate {
    problemId: number;
    problemLevel: number;
    problemTitle: string;
    submissionId: number;
}

interface myProfileData {
    userBackjoonId: string;
    userGithubId: string;
    userImageUrl: string;
}
  
interface tierResponse{
  backgroundId: string;
  badgeId: null;
  bannedUntil: string;
  bio:string;
  class: number;
  classDecoration:string;
  coins: number;
  exp: number;
  handle:string;
  isReverseRival : boolean;
  isRival: boolean;
  joinedAt: string;
  maxStreak: number;
  proUntil: string;
  profileImageUrl: null;
  rank: number;
  rating: number;
  ratingByClass: number;
  ratingByProblemsSum: number;
  ratingBySolvedCount: number;
  ratingByVoteCount: number;
  reverseRivalCount: number;
  rivalCount: number;
  solvedCount: number
  stardusts: number;
  tier: number;
  voteCount: number;
}

interface backImageResponse{
  authors:[];
  backgroundCategory: string;
  backgroundId: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: null;
  displayDescription: string;
  displayName: string;
  fallbackBackgroundImageUrl: null;
  hiddenConditions: boolean;
  isIllust: boolean;
  unlockedUserCount: number;
}

 /**
 * backgroudImage: backgroundImageUrl 가져오기
 *  */
export const getBackImage = (backgroundId: string, enabled: boolean) =>{
  const setProfileState = useSetRecoilState(profileState);

  const {data, isLoading, refetch} = useQuery(
    ["backimageupdate"], async():Promise<backImageResponse>=>{
      const {data} = await axios.get(`https://solvedac-ixdn5ymk3a-du.a.run.app/backgroundShow/${backgroundId}`)
      setProfileState((prev)=>{
        const updateState = {...prev, backImage: data.backgroundImageUrl, backVideo: data.backgroundVideoUrl}
        return updateState;
      })
      return data;
    }, {
      enabled: enabled,
      staleTime: 5* 1000* 60,
    }
  )
  return {data, isLoading, refetch};
}

  /**
 * tier: tier 및 backgroundId solved ac에서 가져오기
 */

export const getTier = (userBackjoonId: string, enabled: boolean) =>{
  const setProfileState = useSetRecoilState(profileState);

  const {data, isLoading, refetch} = useQuery(
    ["tierupdate"], async():Promise<tierResponse>=>{
      const{data} = await axios.get(`https://solvedac-ixdn5ymk3a-du.a.run.app/userShow/${userBackjoonId}`)
      setProfileState((prev)=>{
        const updateState = {...prev, tier: data.tier, backgroundId: data.backgroundId}
        return updateState;
      })
      return data;
    }, {
      enabled: enabled,
      staleTime: 5* 1000* 60,
    }
  )
  return {data, isLoading, refetch};
}

   /**
 * profile: github 이미지, 이름, backjoonId 가져오기
 */
  export const getProfile = () => {
    const setProfileState = useSetRecoilState(profileState);

    const { data, isLoading} = useQuery(
      ["profileupdate"],
      async (): Promise<myProfileData> => {
        const {data} = await $.get("/user/profile");
        setProfileState((prev)=>{
          const updateState = {...prev, userBackjoonId: data.userBackjoonId}
          return updateState;
        })
        return data;
      },
      {
        staleTime: 5 * 1000 * 60,
      }
    );
    return {data, isLoading};
  };

   /**
 * Grid 상세: 푼 문제 중 최근 5개
 */
  export const getGridDetail=(date:string)=>{
    const dateConvert = date.split("-"); // ["2023", "01", "01"]
    const dateToSend = dateConvert.join(""); // "20230101"

    const {data, isLoading, refetch} = useQuery(
        [
            "gridDetailupdate",
            date,
        ],
        async():Promise<PagableResponse<problemByDate>> =>{
            const {data} =  await $.get(`/code/grass/${dateToSend}`);
            return data;
        },
        {
            staleTime: 5* 1000*60,
        }
    );
    return {data, isLoading, refetch};
  }


  /**
 * Grid 구성 정보 : 날짜, 제출 카운트
 */
  export const getGrid = () => {
    const { data, isLoading, error } = useQuery(
      ["gridupdate"],
      async (): Promise<StreakData[]> => {
        const { data } = await $.get("/code/grass");
        return data;
      },
      {
        staleTime: 5 * 1000 * 60,
      }
    );
    return { data, isLoading, error };
  };
  

