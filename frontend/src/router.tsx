import { RouteObject } from "react-router-dom";
import { NormalPage } from "./page/NormalPage/NormalPage";
import { ExceptionPage } from "./page/ExceptionPage/ExceptionPage";
import { CodePage } from "./page/CodePage/CodePage";
import { Main } from "./page/NormalPage/main/Main";
import { Community } from "./page/NormalPage/community/Community";
import { MyPage } from "./page/NormalPage/mypage/MyPage";

const router: RouteObject[] = [
  {
    path: "/",
    element: <NormalPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/community",
        element: <Community />,
        children: [
          { path: "create", element: <>aa</> },
          { path: "detail/:id", element: <>bb</> },
          { path: "modify/:id", element: <>cc</> },
        ],
      },
      {
        path: "/mypage",
        element: <MyPage />,
        children: [
          { path: "activity", element: <>dd</> },
        ],
      },
    ],
  },
  {
    path: "/code",
    element: <CodePage />,
  },
  {
    path: "*",
    element: <ExceptionPage />,
    children: [
      //   { path: "login-success", element: <LoginSuccess /> },
      //   { path: "*", element: <Page404 /> },
    ],
  },
];

export default router;
