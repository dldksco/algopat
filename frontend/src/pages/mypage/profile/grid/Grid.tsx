import style from "./Grid.module.css";

export const Grid = () => {

    const days =["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
    const months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec"];

    const items = [];
    for(let i = 1; i <= 366; i++) {
    items.push({
        id: i,
        name: `${i}`,
        month: `${months[i%7]}`,
        day: `${days[i%7]}`
    });
    }
    return (
        <>
        <div className={style.gridcontainer}>
        {items.map(item => (
        <div key={item.id} className={style.grid}></div>
      ))}
        </div>
    </>
    )
}
