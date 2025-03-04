import { createCookieSessionStorage } from "react-router";

interface SessionData {
  userId: string;
}

interface SessionFlashData {
  error: string;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      // TODO: セキュリティのため、secretを設定する
    },
  });

export { getSession, commitSession, destroySession };
