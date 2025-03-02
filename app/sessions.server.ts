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
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    },
  });

export { getSession, commitSession, destroySession };
