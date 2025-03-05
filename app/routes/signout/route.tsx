import { destroySession, getSession } from "~/sessions.server";
import { Form, redirect } from "react-router";
import type { Route } from "../signout/+types/route";

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
        <button className="py-1 px-5 bg-sky-500 rounded-2xl text-white cursor-pointer">
          サインアウト
        </button>
      </Form>
    </div>
  );
}
