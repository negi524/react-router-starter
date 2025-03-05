import { useState } from "react";
interface Props {
  text: string;
}

export default function SampleButton(props: Props) {
  const [state, setState] = useState(false);
  const handleClick = () => {
    return setState((prevstate) => !prevstate);
  };
  return (
    <button
      className="py-1 px-5 bg-sky-500 rounded-2xl text-white cursor-pointer"
      onClick={handleClick}
    >
      {props.text} : {state ? "ON" : "OFF"}
    </button>
  );
}
