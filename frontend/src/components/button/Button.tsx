import { HTMLAttributes } from "react";
import style from "./Button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  content: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ content, onClick, ...props }: ButtonProps) => {
  return (
    <>
      <button className={style.button} {...props} onClick={onClick}>
        {content}
      </button>
    </>
  );
};
