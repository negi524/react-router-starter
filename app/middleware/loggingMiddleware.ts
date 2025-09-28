import { logger } from "~/config/logger";
import { getSession } from "~/sessions.server";

/**
 * ログ出力するためのミドルウェア
 */
export async function loggingMiddleware(
  { request }: { request: Request },
  next: () => Promise<Response>,
) {
  const session = await getSession(request.headers.get("Cookie"));
  console.log({ request });
  const url = new URL(request.url);
  logger.info({
    access: "request",
    method: request.method,
    path: url.pathname,
    ip: request.headers.get("x-forwarded-for"),
    userId: session.get("userId") ?? null,
  });
  const response = await next();
  logger.info({
    access: "response",
    status: response.status,
    method: request.method,
    path: url.pathname,
  });
  return response;
}
