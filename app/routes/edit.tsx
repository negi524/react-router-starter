import { useEffect } from "react";
import type { Route } from "./+types/edit";
import { logger } from "~/config/logger";

export async function action({ request }: Route.ActionArgs) {
  // フォームの送信を処理するロジックをここに追加できます
  const form = await request.formData();
  const message = form.get("message");
  logger.info(`Submitted message: ${message}`);
  return null;
}

export default function EditPageRoute() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // NOTE: 非推奨だが、互換性を保つために
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
  return (
    <div>
      <h2>編集画面</h2>
      <form method="POST">
        <textarea id="message" name="message" className="border"></textarea>
        <br />
        <a href="/">Home</a>
        <br />
        <button className="cursor-pointer rounded-2xl bg-sky-500 px-5 py-1 text-white">
          送信
        </button>
      </form>
    </div>
  );
}
