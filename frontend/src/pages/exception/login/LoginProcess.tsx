import { LoadingSpinner } from "@/components/loadingspinner/LoadingSpinner";
import { $ } from "@/connect/axios";
import { useLocation } from "react-router-dom";

export const LoginProcess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  $.post(`/auth/code`, { code: code, isExtension: "YES" })
    .then((res) => {
      console.log(res);
      const accessToken = res.headers["authorization"];
      console.log(accessToken);
      console.log("토큰 세팅 시작");
      window.opener.localStorage.setItem("access-token", accessToken);
      console.log("세팅 완료");

      if (window.opener) {
        window.opener.location.reload();
        window.close();
      }
    })
    .catch(() => {
      alert("로그인에 실패했습니다!! 다시 시도해 주세요!!");
      window.close();
    });
  return (
    <div>
      <LoadingSpinner />
    </div>
  );
};
