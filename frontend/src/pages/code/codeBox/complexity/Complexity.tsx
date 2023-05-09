import { ComplexityData, RefactoringData } from "../../hooks/query";
import style from "./Complexity.module.css";

interface ComplexityProps {
  isModalOpen: boolean;
  data: RefactoringData | ComplexityData;
}

export const Complexity = ({ isModalOpen, data }: ComplexityProps) => {
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
