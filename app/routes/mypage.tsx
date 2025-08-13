import { getSession } from "~/sessions.server";
import type { Route } from "./+types/mypage";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return {
    userId: session.get("userId"),
  };
}
export default function MyPageRoute({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;
  return (
    <div>
      <h1 className="text-4xl">This is MyPage.</h1>
      <p>Your id is 「{userId}」</p>
    </div>
  );
}
