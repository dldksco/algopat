import { CSSProperties } from "react";
import style from "./LoadingSpinner.module.css";

interface props {
  customStyle?: CSSProperties;
}
export const LoadingSpinner = ({ customStyle }: props) => {
  return (
    <div style={customStyle} className={style.spinnerpage}>
      <div className={style.spinner} role="status">
        <span
          className={style.sronly}
          style={{ fontSize: "20px", color: "red" }}
        >
          Loading...
        </span>
      </div>
    </div>
  );
};
