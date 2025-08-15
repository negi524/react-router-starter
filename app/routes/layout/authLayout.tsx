import { Outlet, redirect } from "react-router";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/authLayout";
import { logger } from "~/config/logger";

/**
 * 認証情報を確認し、サインインしていない場合はサインインページにリダイレクトする
 * @param param0
 * @returns
 */
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  logger.info("auth layout log");

  if (!session.has("userId")) {
    // サインインしていない場合、サインインへリダイレクト
    return redirect("/signin");
  }
}
export default function AuthLayout() {
  return <Outlet />;
}
