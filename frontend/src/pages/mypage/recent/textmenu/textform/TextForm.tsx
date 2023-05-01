import { useState } from "react";
import style from "./TextForm.module.css";

interface TextSet{
    data: TextProps
}

interface TextProps{
    title: string,
    date: string,
    views: number,
}

export const TextForm = ({data}: TextSet) => {
    const {title, date, views} = data;
    return (
        <>
            <div className={style.maintxt}>
                <div className={style.checkbox}><input type="checkbox" /></div>
                <div className={style.title}> {title} </div>
                <div className={style.date}> {date} </div>
                <div className={style.views}> {views} </div>
            </div>
        </>
    )
}
