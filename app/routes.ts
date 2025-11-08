import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  layout("./routes/layout/authLayout.tsx", [
    route("mypage", "./routes/mypage.tsx"),
  ]),
  route("sample", "./routes/sample.tsx"),
  route("detail", "./routes/detailList.tsx"),
  route("detail/:id", "./routes/detail.tsx"),
  route("signin", "./routes/signin.tsx"),
  route("signout", "./routes/signout.tsx"),
  route("edit", "./routes/edit.tsx"),
] satisfies RouteConfig;
