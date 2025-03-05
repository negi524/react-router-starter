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
      maxAge: 60 * 3, // 有効期限は3分
      secrets: [process.env.SESSION_SECRET || ""],
    },
  });

export { getSession, commitSession, destroySession };
