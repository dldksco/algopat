import style from "./CheckBox.module.css";

interface CheckBoxProps {
  boardContent: TextProps;
  checked: boolean;
  index: number;
  onChange: (isChecked: boolean) => void;
}

interface TextProps {
  title: string;
  date: string;
  views: number;
  recommend?: number;
}

export const CheckBox = (props: CheckBoxProps) => {
  const { boardContent, checked, index, onChange } = props;
  const checkCallBack = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <div className={style.maintxt}>
      <div className={style.checkbox}>
        <input type="checkbox" checked={checked} onChange={checkCallBack} />
      </div>
      <div className={style.title}>{boardContent.title}</div>
      <div className={style.date}>{boardContent.date}</div>
      <div className={style.views}>{boardContent.views}</div>
    </div>
  );
};
