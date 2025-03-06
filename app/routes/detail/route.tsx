import { Outlet } from "react-router";

export default function DetailListPageRoute() {
  return (
    <div>
      <h1 className="text-4xl">これは一覧ページ</h1>
      <Outlet />
    </div>
  );
}
