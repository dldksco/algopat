import axios from "axios";

// axios 객체 생성
export const $ = axios.create({
  baseURL: "https://algopat.kr/test",
  headers: {
    "Content-Type": "application/json",
  },
});

$.interceptors.request.use((config) => {
  config.headers["authorization"] = localStorage.getItem("access-token");
  return config;
});
