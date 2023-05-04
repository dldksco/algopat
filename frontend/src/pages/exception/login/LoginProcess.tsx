import { $ } from "@/connect/axios";
import { useLocation } from "react-router-dom";

export const LoginProcess = () => {
  const location = useLocation();
  console.log(location);
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  console.log(code);
  console.log("찍히는건 맞음?");

  $.get(`/auth/code?code=${code}`).then((res) => console.log(res));
  return <div>LoginProcess!!</div>;
};
