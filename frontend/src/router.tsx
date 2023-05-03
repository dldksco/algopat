import { RouteObject } from "react-router-dom";
import { Normal } from "./pages/normal/Normal";
import { Main } from "./pages/main/Main";
import { Community } from "./pages/community/Community";
import { List } from "./pages/community/list/List";
import { Create } from "./pages/community/create/Create";
import { Detail } from "./pages/community/detail/Detail";
import { Modify } from "./pages/community/modify/Modify";
import { MyPage } from "./pages/mypage/MyPage";
import { Profile } from "./pages/mypage/profile/Profile";
import { Code } from "./pages/code/Code";
import { Exception } from "./pages/exception/Exception";
import { Ranking } from "./pages/ranking/Ranking";
import { RankingMain } from "./pages/ranking/rankingMain/RankingMain";
import { RankingDetail } from "./pages/ranking/rankingDetail/RankingDetail";
import { Recent } from "./pages/mypage/recent/Recent";
import { TextMenu } from "./pages/mypage/recent/textmenu/TextMenu";
import { AlarmMenu } from "./pages/mypage/recent/alarm/AlarmMenu";
import { RecommendMenu } from "./pages/mypage/recent/recommendmenu/RecommendMenu";
import { CommentMenu } from "./pages/mypage/recent/commentmenu/CommentMenu";

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
        children: [
          { index: true, element: <RankingMain /> },
          { path: "detail/:id", element: <RankingDetail /> },
        ],
      },
      {
        path: "/community",
        element: <Community />,
        children: [
          { index: true, element: <List /> },
          { path: "create", element: <Create /> },
          { path: "detail/:id", element: <Detail /> },
          { path: "modify/:id", element: <Modify /> },
        ],
      },
      {
        path: "/mypage",
        element: <MyPage />,
        children: [
          { index: true, element: <Profile/> },
          { path: "recent", element: <Recent/>, children:[
            {path:"mytext", element: <TextMenu/>},
            {path:"mycomment", element: <CommentMenu/>},
            {path:"myrecommend", element: < RecommendMenu/>},
            {path:"myalarm", element: <AlarmMenu/>},
          ] },
        ],
      },
    ],
  },
  {
    path: "/code",
    element: <Code />,
  },
  {
    path: "*",
    element: <Exception />,
    children: [
      //   { path: "login-success", element: <LoginSuccess /> },
      //   { path: "*", element: <Page404 /> },
    ],
  },
];

export default router;
