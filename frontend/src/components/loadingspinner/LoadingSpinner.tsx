import style from "./LoadingSpinner.module.css";

export const LoadingSpinner = () => {
    return (
        <div className={style.spinnerpage}>
            <div className={style.spinner} role="status">
                <span className={style.sronly} style={{fontSize:"20px", color: "red"}}>Loading...</span>
            </div>
        </div>
    );
  };

