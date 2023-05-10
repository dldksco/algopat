import axios from "axios";

// axios 객체 생성
export const $ = axios.create({
  baseURL: "https://algopat.kr/api",
  headers: {
    "Content-Type": "application/json",
  },
});

$.interceptors.request.use((config) => {
  config.headers["authorization"] = localStorage.getItem("access-token");
  return config;
});

$.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("access 토큰 만료");
      localStorage.removeItem("access-token");
      $.get("/token/accesstoken", {
        withCredentials: true,
      })
        .then((res) => {
          const accessToken = res.headers["authorization"];
          console.log(accessToken);
          console.log("토큰 세팅 시작");
          localStorage.setItem("access-token", accessToken);
        })
        .catch(() => {
          alert("토큰이 만료되었습니다! 다시 로그인 해주세요!");
          window.location.href = `https://www.algopat.kr`;
        });
    }
    return Promise.reject(error);
  }
);
