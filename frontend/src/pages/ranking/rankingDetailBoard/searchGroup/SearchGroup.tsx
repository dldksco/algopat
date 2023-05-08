import { SelectBox } from "@/components/selectBox/SelectBox";
import { Input } from "@/components/input/Input";
import { useState } from "react";

import style from "./SearchGroup.module.css";
import { Button } from "@/components/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchGroup = () => {
  const langSelectOption = [
    { value: "", name: "전체보기" },
    { value: "c", name: "C" },
    { value: "cpp", name: "C++" },
    { value: "java", name: "JAVA" },
    { value: "javascript", name: "Javascript" },
    { value: "python", name: "Python" },
  ];

  const sortSelectOption = [
    { value: "submitTIme", name: "제출순" },
    { value: "time", name: "실행시간순" },
    { value: "memory", name: "메모리순" },
    { value: "refactoring", name: "리팩토링순" },
    { value: "code", name: "코드길이순" },
  ];

  const [lagnSelect, setLagnSelect] = useState(langSelectOption[0].value);
  const [sortSelect, setSortSelect] = useState(sortSelectOption[0].value);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={style.search_group}>
      <SelectBox
        options={langSelectOption}
        style={{ borderRadius: 0, width: "100%" }}
        setValue={setLagnSelect}
        value={lagnSelect}
      />
      <SelectBox
        options={sortSelectOption}
        style={{ borderRadius: 0, width: "100%" }}
        setValue={setSortSelect}
        value={sortSelect}
      />
      <div className={style.search}>
        <Input
          style={{ borderRadius: 0 }}
          setInput={setSearchInput}
          input={searchInput}
        />
        <div className={style.search_button}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </div>
  );
};
