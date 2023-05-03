import { Outlet } from "react-router-dom";

export const Exception = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      나는 예외페이지다
      <Outlet />
    </div>
  );
};
