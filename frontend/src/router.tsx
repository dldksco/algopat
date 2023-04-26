import { RouteObject } from "react-router-dom";
import { Normal } from "./page/normal/Normal";
import { Main } from "./page/main/Main";
import { Community } from "./page/community/Community";
import { List } from "./page/community/list/List";
import { Create } from "./page/community/create/Create";
import { Detail } from "./page/community/detail/Detail";
import { Modify } from "./page/community/modify/Modify";
import { MyPage } from "./page/mypage/MyPage";
import { Profile } from "./page/mypage/profile/Profile";
import { Activity } from "./page/mypage/activity/Activity";
import { Code } from "./page/code/Code";
import { Exception } from "./page/exception/Exception";

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
          {index : true, element: <Profile/>},
          { path: "activity", element: <Activity/> },
        ],
      },
    ],
  },
  {
    path: "/code",
    element: <Code/>,
  },
  {
    path: "*",
    element: <Exception/>,
    children: [
      //   { path: "login-success", element: <LoginSuccess /> },
      //   { path: "*", element: <Page404 /> },
    ],
  },
];

export default router;
