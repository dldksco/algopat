import { RouteObject } from "react-router-dom";
import { NormalPage } from "./page/NormalPage/NormalPage";
import { ExceptionPage } from "./page/ExceptionPage/ExceptionPage";
import { CodePage } from "./page/CodePage/CodePage";
import { Main } from "./page/NormalPage/main/Main";
import { Community } from "./page/NormalPage/community/Community";
import { Create } from "./page/NormalPage/community/create/Create";
import { Detail } from "./page/NormalPage/community/detail/Detail";
import { Modify } from "./page/NormalPage/community/modify/Modify";
import { Profile } from "./page/NormalPage/mypage/profile/Profile";
import { Activity } from "./page/NormalPage/mypage/activity/Activity";
import { MyPage } from "./page/NormalPage/mypage/MyPage";
import { List } from "./page/NormalPage/community/list/list";

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
          {index : true, element : <List/>},
          { path: "create", element: <Create/> },
          { path: "detail/:id", element: <Detail/> },
          { path: "modify/:id", element: <Modify/> },
        ],
      },
      {
        path: "/mypage",
        element: <MyPage/>,
        children: [
          {index : true, element: <Profile />},
          { path: "activity", element: <Activity/> },
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
