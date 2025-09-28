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
  const url = new URL(request.url);
  const startTime = Date.now();

  const response = await next();

  const duration = Date.now() - startTime;
  logger.info({
    method: request.method,
    path: url.pathname,
    status: response.status,
    duration,
    ip: request.headers.get("x-forwarded-for"),
    userId: session.get("userId") ?? null,
  });

  return response;
}
