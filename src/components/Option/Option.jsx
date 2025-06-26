import { useState } from "react";
import "./Option.css";

function Option({ text }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`option ${isSelected ? "selected" : ""} `}
      onClick={() => setIsSelected(!isSelected)}
    >
      {text}
    </div>
  );
}

export default Option;
