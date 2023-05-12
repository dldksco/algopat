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
          minHeight: "calc(100vh - 330px)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <Outlet />
      </div>
      <div style={{ backgroundColor: "#d4d4d4" }}>
        <Footer />
      </div>
    </div>
  );
};
