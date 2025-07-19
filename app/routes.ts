import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("sample", "./routes/sample.tsx"),
  route("detail", "./routes/detailList.tsx"),
  route("detail/:id", "./routes/detail.tsx"),
  route("mypage", "./routes/mypage.tsx"),
  route("signin", "./routes/signin.tsx"),
  route("signout", "./routes/signout.tsx"),
] satisfies RouteConfig;
