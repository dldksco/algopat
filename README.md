[![Algopat](./image/algopat-logo.png/ "Algopat Logo")](https://algopat.kr/ "Visit Algopat")   
### ChatGPT & LangChain을 활용한 알고리즘 소스코드 효율성 분석 서비스  

## 💡 프로젝트 소개 (배경, 개요)

알고리즘 문제를 풀다 보면 효율성 측면에서 소홀한 경우가 많습니다.  
내가 작성한 코드가 시간, 공간 측면으로 효율적인지 코드의 구조와 변수명은 적합한지 알기 어렵습니다.  
누군가 논리적인 근거로 타당한 가이드라인을 제시해 준다면...
#### -> 이와 같은 많은 고민을 해결하기 위해 만든, 알고리즘 소스코드 효율성 분석 서비스입니다.  

## ✨ 프로젝트 주요 기술 

1. 인증/인가
   - Github 소셜 로그인 (OAuth 2.0)
   - Spring Security 
   - JWT (AccessToken, RefreshToken)
   - Spring Cloud Gateway, Eureka  
2. 크롬 익스텐션
   - Crawling (문제, 회원 제출 코드)
   - WebFlux를 이용한 SSE (실시간 알림, 진행상황에 대한 progress bar UI 제공)  
3. 알고리즘 소스 코드 분석 
   - LangChain + ChatGPT 라이브러리를 활용한 코드 분석 
        - 시간 복잡도 (Big O)
        - 공간 복잡도 (Big O)
        - 리팩토링 가이드 
    - 비용 절감 및 응답 시간 최적화를 위한 캐싱 적용 (문제 정보)
    - DB 동시성 문제를 해결하기 위한 Redis를 이용한 분산락 구현 
    - MSA 구조에서 Kafka Clustering을 통한 안정성 부여 
4. 랭킹 
   - 3가지 기준을 통한 순위 제공 (총 점수, 시간 복잡도, 제출 시간 기준으로 순위 집계)  
   - 내가 푼 문제 통계 기록 열람 가능 
5. 마이페이지 
   - 잔디 (제출 일자에 따른 활동 기록, 총 제출 횟수에 따른 비례식 적용)
6. Anomaly (SAGA Pattern : Choreography)
   - 비정상적인 예외현상 발생 시, 보상 트랜잭션 적용 (무료 제출 횟수 +1)
   - Kafka 전송 실패를 고려한 Retry 설정 적용 (50번, 10ms) 

## 🛠️ 기술 스택

<div align=center>
<img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=Grafana&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Zipkin-F46800?style=for-the-badge&logo=Zipkin&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>


<br>

<img src="https://img.shields.io/badge/Apache Kafka-231F20?style=for-the-badge&logo=Apache Kafka&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/kibana-005571?style=for-the-badge&logo=Kibana&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Logstash-005571?style=for-the-badge&logo=Logstash&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Beats-005571?style=for-the-badge&logo=Beats&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br>

<img src="https://img.shields.io/badge/Java-FF7800?style=for-the-badge&logo=Java&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/WebFlux-6DB33F?style=for-the-badge&logo=WebFlux&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Spring Cloud-6DB33F?style=for-the-badge&logo=Spring Cloud&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Recoil-61DAFB?style=for-the-badge&logo=Recoil&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br>

<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> 
<img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<br/>

  <br/>
<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분     | 기술스택        | 상세내용           | 버전      |
| -------- | --------------- | ------------------ | --------- |
| 공통     | 형상관리        | Gitlab              | \-        |
|          | 이슈관리        | Jira                | \-        |
|          | 커뮤니케이션    | Mattermost, Notion | \-        |
| BackEnd  | DB              | MariaDB            |     |
|          |                 | JPA                |      |
|          | Java            | Zulu               |  |
|          | Spring          | Spring             |     |
|          |                 | Spring Boot        |      |
|          | IDE             | IntelliJ           | 2022.3.1  |
|          | Build           | Gradle             |        |
|          | API Docs        | Postman            |           |
| FrontEnd | HTML5           |                    | \-        |
|          | CSS3            |                    | \-        |
|          | JavaScript(ES6) |                    | \-        |
|          | React           | React              | 18.2.0    |
|          | Node.js         | npm                | 18.14.2   |
|          | IDE             | Visual Studio Code | 1.78.2    |
| Server   | 서버            | AWS EC2            | \-        |
|          | 플랫폼          | Ubuntu\AWS Liunx   | 20.04 , AWS Linux2|
|          | CI/CD           | Docker             | 20.10.17  |
|          |                 | Jenkins            | jenkins/jenkins:lts|  

</details>
</div>

## 📆 프로젝트 기간

### 23.4.10 ~ 23.5.19

- 기획 및 설계 : 23.4.10 ~ 23.4.16
- A / B 테스트 : 23.4.17 ~ 23.4.23 
- 프로젝트 구현 : 23.4.24 ~ 23.5.14
- 버그 수정 및 산출물 정리 : 23.5.15 ~ 23.5.19


## 📋 상세 페이지  
### 크롬 익스텐션
<img src="./image/detail_extension1.png" height="500px" width="500px" /> 
<img src="./image/detail_extension2.png" height="500px" width="500px" /> <br>
### 메인 페이지  
![detail1](./image/detail1.png)  
### 코드 분석 결과 페이지  
![detail2](./image/detail2.png)  
### 랭킹 페이지  
![detail3](./image/detail3.png)  
### 랭킹 상세 페이지  
![detail4](./image/detail4.png)  
### 마이페이지  
![detail5](./image/detail5.png)  



## 👪 개발 멤버 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="">
            <img src="./image/human7.png" height="140px" width="140px" /> <br><br> 😶 김소현 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="">
            <img src="./image/human9.png" height="140px" width="140px" /> <br><br> 🙂 박동환 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="">
            <img src="./image/human20.png" height="140px" width="140px" /> <br><br> 😆 이연학 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="">
            <img src="./image/human10.png" height="140px" width="140px" /> <br><br> 👑 이찬희 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="">
            <img src="./image/human21.png" height="140px" width="140px" /> <br><br> 😁 이안채 <br>(Back-End) </a> <br></td>
		<td height="140px" align="center"> <a href="">
            <img src="./image/human11.png" height="140px" width="140px" /> <br><br> 😶 최웅렬 <br>(Back-End) </a> <br></td>
    </tr>
    <tr>
        <td align="center">React<br/>Chrome Extension<br/></td>
        <td align="center">React<br/>Chrome Extension<br/></td>
        <td align="center">React<br/>Chrome Extension<br/></td>
        <td align="center">Spring Boot<br/>Fast API<br/></td>
        <td align="center">Spring Boot<br/>Fast API<br/></td>
        <td align="center">Spring Boot<br/>Fast API<br/>CI/CD<br/></td>
    </tr>
</table>


---

### 📋 시스템 아키택쳐

![아키텍쳐](./image/system.png)


---

### 📋 ERD 다이어그램

![ERD](./image/erd.png)

---

