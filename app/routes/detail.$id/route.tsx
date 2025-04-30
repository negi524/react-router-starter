import { data, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  const num = Number(params.id);

  if (!Number.isFinite(num)) {
    throw new Error("数値ではありません");
  }

  if (num < 0) {
    throw data<string>("内部エラー", { status: 500 });
  }

  if (100 <= num) {
    throw data<string>("IDが見つかりません", { status: 404 });
  }

  return {
    id: num,
  };
}

export default function DetailPageRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h2 className="text-3xl">これは詳細ページ</h2>
      <p>パラメータ:{loaderData.id}</p>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log({ error });
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>エラー</h1>
        <p>{error.message}</p>
        <p>スタックトレースは次のとおりです:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>不明なエラー</h1>;
  }
}
