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
      secrets: [process.env.SESSION_SECRET || ""],
    },
  });

export { getSession, commitSession, destroySession };
