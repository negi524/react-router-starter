export function BasicError(props: { status: number; message?: string }) {
  const getTitle = (status: number) => {
    switch (status) {
      case 400:
        return "不正なリクエストです";
      case 401:
        return "認証エラーです";
      case 404:
        return "ページが見つかりません";
      case 500:
        return "内部エラーです";
      default:
        return "エラーが発生しました";
    }
  };

  return (
    <>
      <div className="text-4xl">{props.status}</div>
      <h1>{getTitle(props.status)}</h1>
      <p>{props.message ?? "エラーが発生しました"}</p>
    </>
  );
}
