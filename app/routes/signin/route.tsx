import { commitSession, getSession } from "~/sessions.server";
import { data, redirect } from "react-router";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // サインインしている場合は、mypageにリダイレクト
    return redirect("/mypage");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const userId = validateCredentials(username, password);

  // ログイン失敗
  if (userId == null) {
    session.flash("error", "ユーザー名/パスワードが無効です");

    return redirect("/signin", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  // ログイン成功
  return redirect("/mypage", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const validateCredentials = (
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
): string | null => {
  if (username && password) {
    return username.toString();
  }
  return null;
};
export default function SignInRoute({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;

  return (
    <>
      <h1 className="text-4xl">Sign in</h1>
      <div>
        {error ? <div className="text-red-600">{error}</div> : null}
        <form method="POST">
          <div>
            <p>サインインしてください</p>
          </div>
          <label>
            ユーザー名: <input type="text" name="username" />
          </label>
          <label>
            パスワード: <input type="password" name="password" />
          </label>
          <button className="cursor-pointer rounded-2xl bg-sky-500 px-5 py-1 text-white">
            送信
          </button>
        </form>
      </div>
    </>
  );
}
