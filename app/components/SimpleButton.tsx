import { useState } from "react";

export function SimpleButton() {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState((prevState) => !prevState);
  };
  return (
    <button
      className="py-1 px-5 bg-sky-500 rounded-2xl text-white cursor-pointer"
      onClick={handleClick}
    >
      {state ? "ON" : "OFF"}
    </button>
  );
}
