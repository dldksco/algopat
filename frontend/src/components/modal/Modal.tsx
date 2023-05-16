import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./Modal.module.css";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

export const Modal = ({ setModalOpen, children }: ModalProps) => {
  return (
    <>
      <div className={style.background} onClick={() => setModalOpen(false)} />
      <div className={style.container}>
        <FontAwesomeIcon
          icon={faXmark}
          className={style.close}
          onClick={() => setModalOpen(false)}
        />
        <div className={style.content}>{children}</div>
      </div>
    </>
  );
};
