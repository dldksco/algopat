import { HTMLAttributes } from "react";
import style from "./Input.module.css";

// input, setInput은 부모 컴포넌트 주입해 주어야 한다.
// onKeyDown 이벤트는 Enter를 쳤을 때 일어날 함수를 설정해 준다.
interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type?: string;
  input: string;
  onKeyDown?: any;
  disabled?: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({
  type,
  placeholder,
  input,
  onKeyDown,
  setInput,
  disabled,
  ...props
}: InputProps) => {
  return (
    <input
      className={style.input_text}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      type={type}
      placeholder={placeholder}
      value={input}
      onKeyDown={(event) => {
        if (event.key === "Enter") onKeyDown(event);
      }}
      disabled={disabled === undefined ? false : disabled}
      {...props}
    />
  );
};
