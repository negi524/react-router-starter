import type { Route } from "../detail.$id/+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  const num = Number(params.id);

  return {
    id: num,
  };
}

export default function DetailPageRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-4xl">これは詳細ページ</h1>
      <p>パラメータ:{loaderData.id}</p>
    </div>
  );
}
