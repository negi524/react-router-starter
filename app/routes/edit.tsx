import { useEffect } from "react";

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
      <textarea id="message" name="message" className="border"></textarea>
      <br />
      <a href="/">Home</a>
    </div>
  );
}
