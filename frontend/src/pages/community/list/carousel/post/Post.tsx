import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { stringCutter } from "@/pages/code/hooks/func";
import style from "./Post.module.css";

interface Post {
  title: string;
  content: string;
  date: string;
  viewCount: number;
  commentCount: number;
  likedCount: number;
}

interface PostProps {
  data: Post;
}

export const Post = ({ data }: PostProps) => {
  const { title, content, date, viewCount, commentCount, likedCount } = data;

  return (
    <div className={style.post}>
      <p>{date}</p>
      <h3>{stringCutter(title, 40)}</h3>
      <p>{stringCutter(content, 100)}</p>
      <hr />
      <div className={style.post_buttom}>
        <div>
          <FontAwesomeIcon
            icon={faEye}
            className={style.close}
            onClick={() => {}}
          />
          {" " + viewCount}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMessage}
            className={style.close}
            onClick={() => {}}
          />
          {" " + commentCount}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faHeart}
            className={style.close}
            onClick={() => {}}
            style={{ color: "red" }}
          />
          {" " + likedCount}
        </div>
      </div>
    </div>
  );
};
