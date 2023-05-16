import { Outlet } from "react-router-dom";

export const Exception = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Outlet />
    </div>
  );
};
