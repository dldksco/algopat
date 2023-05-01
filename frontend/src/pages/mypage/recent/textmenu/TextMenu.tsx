import { Button } from "@/components/button/Button";
import style from "./TextMenu.module.css";
import { useState } from "react";


export const TextMenu = () => {
    return (
        <>
        <div className={style.description}>
            <span>n개의 작성한 글이 있습니다.</span>
            <div className={style.selectBox}> 
            전체선택</div>
            <div className={style.buttonContainer}>
                <Button className={style.deleteButton}content="삭제" onClick={()=>{}}></Button>
            </div>
            </div>
            <div className={style.context}>
                <div className={style.title}>제목</div>
                <div className={style.date}>날짜</div>
                <div className={style.views}>조회수</div>
            </div>
            <div className={style.maintxt}>
                <div className={style.title}>백준문제 2323번 도와주세요!</div>
                <div className={style.date}>2023.10.29</div>
                <div className={style.views}>29</div>
            </div>
        </>
    )
}
