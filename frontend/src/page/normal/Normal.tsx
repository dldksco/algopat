import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

export const Normal = () => {
  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          backgroundColor: "var(--background-color)",
        }}
      >
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};
