import { Button } from "@/components/button/Button";
import style from "./TextMenu.module.css";
import { v4 as uuidv4 } from "uuid";
import { TextForm } from "./textform/TextForm";

export const TextMenu = () => {

    const dummyData = [
        { title: "[백준1] 배열 돌리기 5 매우 쉽게 잘 푸는 법", date: "2020.02.21", views: 20 },
        { title: "[백준2] 배열 돌리기 5 매우 쉽게 잘 푸는 법", date: "2020.02.23", views: 30 },
        { title: "[백준3] 배열 돌리기 5 매우 쉽게 잘 푸는 법", date: "2020.02.24", views: 21 },
        { title: "[백준4] 배열 돌리기 5 매우 쉽게 잘 푸는 법", date: "2020.02.24", views: 21 },  
    ];
    return (
        <>
        <div className={style.description}>
            <span>n개의 작성한 글이 있습니다.</span>
            <div className={style.checkBox}>
            <input type="checkbox" /> 
            전체선택</div>
            <div className={style.buttonContainer}>
                <Button className={style.deleteButton}content="삭제" onClick={()=>{}}></Button>
            </div>
            </div>
            <div className={style.context}>
                <div className={style.title}>제목</div>
                <div className={style.date}>작성일</div>
                <div className={style.views}>조회수</div>
            </div>
            {dummyData.map((el)=>(
            <TextForm key={uuidv4()} data={el}/>
            ))}
        </>
    )
}
