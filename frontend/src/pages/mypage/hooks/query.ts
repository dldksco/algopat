import { PagableResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";


export interface problemByDate {
    problemId: number;
    problemLevel: number;
    problemTitle: string;
    submissionId: number;
  }

  
  interface StreakData {
    userSubmitProblemCreatedAt: string;
    solvedCount: number;
  }

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
  