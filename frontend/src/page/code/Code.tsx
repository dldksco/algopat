import style from "./Code.module.css"
import { SideNav } from "./sideNav/SideNav"

export const Code = () => {
  return (
    <div className={style.code}>
      <div style={{width: "20%"}}>
        <SideNav/>
      </div>
      <div style={{width: "80%", height: "1000px", backgroundColor: "blue"}}>

      </div>
    </div>
  )
}
