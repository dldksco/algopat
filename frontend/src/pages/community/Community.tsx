import { Outlet } from "react-router-dom";

export const Community = () => {
  const dummyData = [
    { userName: "라면부엉", tier: 1, comment: "아라랄라라라라", recommend: 12 },
    { userName: "alice", tier: 2, comment: "아라랄라라라라", recommend: 1 },
    { userName: "Seja", tier: 3, comment: "아라랄라라라라", recommend: 12 },
  ];

  return (
    <>
      <Outlet />
    </>
  );
};
