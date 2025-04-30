import { destroySession, getSession } from "~/sessions.server";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/signin", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function SignOutRoute() {
  return (
    <div>
      <h1>Sign out</h1>
      <Form method="post">
        <button className="cursor-pointer rounded-2xl bg-sky-500 px-5 py-1 text-white">
          サインアウト
        </button>
      </Form>
    </div>
  );
}
