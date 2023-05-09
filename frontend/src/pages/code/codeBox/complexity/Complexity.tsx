import style from "./Complexity.module.css";

interface ComplexityProps {
  isModalOpen: boolean;
}

export const Complexity = ({ isModalOpen }: ComplexityProps) => {
  return (
    <div
      className={
        isModalOpen
          ? style.box_content
          : style.box_content + " " + style.not_open
      }
    ></div>
  );
};
