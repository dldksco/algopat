import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

export const Normal = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Header />
      <div
        style={{
          maxWidth: "var(--max-width)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
