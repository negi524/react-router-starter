import { Outlet } from "react-router";
import type { Route } from "./+types/route";

export async function loader() {
  return {
    sample: 1,
  };
}

export default function DetailListPageRoute({
  loaderData,
}: Route.ComponentProps) {
  console.log({ loaderData });
  return (
    <div>
      <h1 className="text-4xl">これは一覧ページ</h1>
      <Outlet />
    </div>
  );
}
