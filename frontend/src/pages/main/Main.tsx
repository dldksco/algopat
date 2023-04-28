import { Button } from "@/components/button/Button";
import style from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import code2 from "@/assets/img/main/code2.png";
import code3 from "@/assets/img/main/code3.png";
import gpticon from "@/assets/img/main/gpticon.png";
import bird from "@/assets/img/main/bird.png";

export const Main = () => {
  return (
    <div className={style.mainpage}>
      <div className={style.fpage}>
        <div className={style.content}>
          <h1 style={{ border: "none" }}>ALGOPAT</h1>
          <p>여러분의 코딩 문제 풀이를</p>
          <p>피드백 해드립니다!</p>
          <div className={style.button_hover}>
            <Button
              content="설치하기"
              style={{
                borderRadius: "0px",
                padding: "10px 35px 10px 20px",
              }}
              onClick={() => {
                window.location.href =
                  "https://chrome.google.com/webstore/detail/algopat/kgajbdbdokjnkmbjngibhjknlkfikace?hl=ko";
              }}
            />
            <FontAwesomeIcon icon={faArrowUp} className={style.button_arrow} />
          </div>
        </div>
        <div
          className={style.code_background}
          style={{
            backgroundImage: "url(/assets/img/main/background_dark.png)",
          }}
        ></div>
      </div>
      <div className={style.cpage}>
        <div className={style.gptcode}>
          <img src={code2} className={style.code_image} />
          <div className={style.gptdesc}>
            <h1>
              <span style={{ color: "#7472CB" }}>수치화</span>된 분석
            </h1>
            <p>수치화된 분석을 여러분들에게 제공합니다.</p>
            <p> GPT가 부여한 점수를 비교하고 여러분의 </p>
            <p>코드를 비교해서 완성도를 높여보세요</p>
          </div>
        </div>
        <div
          style={{ backgroundColor: "red", width: "100%", height: "30%" }}
        ></div>
      </div>
      <div className={style.cpage}>
        <div className={style.gptcode}>
          <img src={code3} className={style.code_image} alt="" />
          <div className={style.gptdesc} style={{ width: "50%" }}>
            <h1>
              <span style={{ color: "#7472CB" }}>리팩토링</span> 제공
            </h1>
            <p>
              어떤 방식으로 코드를 리팩토링해야 깔끔하게 짤 수 있을 지
              모르겠나요?
            </p>
            <p> Algopat은 여러분에게 효율적인 Format을 제공합니다. </p>
          </div>
        </div>
      </div>
      <div className={style.lpage}>
        <h1>Main Tech.</h1>
        <div className={style.contentbox}>
          <div
            className={style.gptbox}
            style={{
              background:
                "linear-gradient(to top, var(--background-color), #874747)",
            }}
          >
            <img src={bird} alt="" />
            <h1>Lang Chain</h1>
            <p>긴 프롬프트를 연이은 단락으로</p>
            <p>만들어, GPT가 맥락을 파악하여</p>
            <p>코드를 이해할 수 있도록 하는 기술</p>
          </div>
          <div
            className={style.gptbox}
            style={{
              background:
                "linear-gradient(to top, var(--background-color), #578547)",
            }}
          >
            <img src={gpticon} alt="" />
            <h1>CHAT GPT</h1>
            <p>긴 프롬프트를 연이은 단락으로</p>
            <p>만들어, GPT가 맥락을 파악하여</p>
            <p>코드를 이해할 수 있도록 하는 기술</p>
          </div>
        </div>
        <Button
          content="바로 시작하기"
          style={{
            backgroundColor: "#61ff71",
            color: "black",
            border: "1px solid black",
            fontSize: "1.3rem",
            fontWeight: "700",
            padding: "20px 60px",
          }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
