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
      domain: "*",
    },
  });

export { getSession, commitSession, destroySession };
