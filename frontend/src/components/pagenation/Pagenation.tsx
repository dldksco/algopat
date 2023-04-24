import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import style from "./Pagenation.module.css";

/** JPA Pagenation에서 넘겨주는 데이터를 그대로 주입해준다
 *  url부분은 구조를 바꿔야 한다. 나중에 수정하자
 */
interface PagenationProps {
  number?: number;
  first?: boolean;
  last?: boolean;
  totalPages?: number;
  url?: string;
}

export const Pagenation = ({
  number,
  first,
  last,
  totalPages,
  url,
}: PagenationProps) => {
  number = number || 0;
  first = first || first;
  last = last || last;
  totalPages = totalPages || 1;
  url = url || "";

  const navigate = useNavigate();
  const startNum = Math.floor((Math.max(number + 1, 1) - 1) / 10) * 10 + 1;

  const pageListRander = () => {
    const pageList = [];

    pageList.push(
      <div className={!first ? style.page_number : style.noWork} key={uuidv4()}>
        <FontAwesomeIcon
          onClick={() => {
            navigate((url as string) + ((number as number) + 0));
          }}
          icon={faChevronLeft}
        />
      </div>
    );

    for (
      let i = startNum;
      i <= Math.min(Math.max(totalPages as number, 1), startNum + 9);
      i++
    ) {
      pageList.push(
        <div
          key={uuidv4()}
          className={
            i !== (number as number) + 1 ? style.page_number : style.nowPage
          }
        >
          <span
            onClick={() => {
              navigate((url as string) + i);
            }}
          >
            {i}
          </span>
        </div>
      );
    }

    pageList.push(
      <div className={!last ? style.page_number : style.noWork} key={uuidv4()}>
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => {
            navigate((url as string) + ((number as number) + 2));
          }}
        />
      </div>
    );

    return pageList;
  };

  return <div className={style.pagination}>{pageListRander()}</div>;
};
