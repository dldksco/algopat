import axios from "axios";

// axios 객체 생성
export const $ = axios.create({
  // baseURL: "https://algopat.kr/test",
      baseURL:
      "https://github.com/login/oauth/authorize?client_id=62a8bd9fd0300fdc6d37&redirect_uri=http://algopat.kr/test/auth/code",
  headers: {
    "Content-Type": "application/json",
  },
});

$.interceptors.request.use((config) => {
  config.headers["token"] = sessionStorage.getItem("token");
  return config;
});
