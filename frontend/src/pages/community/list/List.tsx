import { Carousel } from "./carousel/Carousel";
import { CommunityBoard } from "./communityBoard/CommunityBoard";
import style from "./List.module.css";

export const List = () => {
  return (
    <div className={style.list}>
      <Carousel />
      <CommunityBoard />
    </div>
  );
};
