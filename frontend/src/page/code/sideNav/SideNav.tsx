import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import {
  faArrowDown91,
  faArrowDown19,
} from "@fortawesome/free-solid-svg-icons";
import style from "./SideNav.module.css";
import sort_tier_img from "@/assets/img/code/sort_tier.png";
import { Problem } from "./problem/Problem";

export const SideNav = () => {
  const isOpen = [false, false, false, false, false];
  const dummy_data = [
    {
      level: "16",
      problemId: "17472",
      title: "테트로미노",
      solved: [
        {
          submissionId: "123213",
        },
        {
          submissionId: "333333",
        },
      ],
    },
    {
      level: "13",
      problemId: "17432",
      title: "테트로미노123fa3",
      solved: [
        {
          submissionId: "44444",
        },
        {
          submissionId: "3335555333",
        },
      ],
    },
  ];

  return (
    <div className={style.sideNav}>
      <p>코드 분석</p>
      <div></div>
      <div className={style.sort_button_group}>
        <div className={style.sort_button}>
          <FontAwesomeIcon icon={faClock} />
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </div>
        <div className={style.sort_button}>
          <img src={sort_tier_img} />
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </div>
        <div className={style.sort_button}>
          <FontAwesomeIcon icon={faArrowDown91} />
        </div>
      </div>
      {dummy_data.map((el) => (
        <Problem key={uuidv4()} data={el} />
      ))}
      <hr />
    </div>
  );
};
