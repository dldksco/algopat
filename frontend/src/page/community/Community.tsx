import { Outlet } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";
import {Comment} from "./detail/comment/Comment";

export const Community = () => {
  const dummyData = [
    {"userName": "라면부엉", "tier":1, "comment": "아라랄라라라라", "recommend": 12},
    {"userName": "alice", "tier":2, "comment": "아라랄라라라라","recommend": 1},
    {"userName": "Seja", "tier":3, "comment": "아라랄라라라라", "recommend": 12}
]
  const highRecommend = dummyData.sort((prev, current) => current.recommend - prev.recommend );
  return (
    <>
    <div>Community
    </div>
    <div>
    {highRecommend.map((el) => (
        <Comment key={uuidv4()} data={el} />
      ))}
    </div>
    <Outlet/>
      </>
    
    
  )
}
