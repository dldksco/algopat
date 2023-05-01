import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { useState } from "react";
import style from "./ListSearch.module.css";

export const ListSearch = ({ url }: { url: string }) => {
  const [input, setInput] = useState("");

  return (
    <div className={style.list_search}>
      <Input
        input={input}
        setInput={setInput}
        style={{ width: "20%", minWidth: "150px" }}
      />
      {!input && (
        <div className={style.placeholder}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span> 제목 + 내용</span>
        </div>
      )}
      <Button
        content="검 색"
        onClick={() => {}}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};
