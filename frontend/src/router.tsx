import { RouteObject } from "react-router-dom";
import { Normal } from "./pages/normal/Normal";
import { Main } from "./pages/main/Main";
import { MyPage } from "./pages/mypage/MyPage";
import { Profile } from "./pages/mypage/profile/Profile";
import { Code } from "./pages/code/Code";
import { Exception } from "./pages/exception/Exception";
import { Ranking } from "./pages/ranking/Ranking";
import { RankingDetail } from "./pages/ranking/rankingDetail/RankingDetail";
import { LoginProcess } from "./pages/exception/login/LoginProcess";
import { Page404 } from "./pages/exception/page404/Page404";
import { Extension } from "./pages/code/extension/Extension";

const router: RouteObject[] = [
  {
    path: "/",
    element: <Normal />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/ranking",
        element: <Ranking />,
      },
      {
        path: "/ranking/:id",
        element: <RankingDetail />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
        children: [{ index: true, element: <Profile /> }],
      },
    ],
  },
  {
    path: "/code",
    element: <Code />,
  },
  {
    path: "/extension",
    element: <Extension />,
  },
  {
    path: "*",
    element: <Exception />,
    children: [
      { path: "login-process", element: <LoginProcess /> },
      { path: "*", element: <Page404 /> },
    ],
  },
];

export default router;
