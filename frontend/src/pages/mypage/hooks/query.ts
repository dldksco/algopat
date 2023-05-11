import { PagableResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { $ } from "@/connect/axios";


export interface problemByDate {
    problemId: number;
    problemLevel: number;
    problemTitle: string;
    submissionId: number;
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


