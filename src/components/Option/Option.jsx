import { useEffect, useState } from "react";
import "./Option.css";

function Option({ option, onSelect }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) onSelect(option.id);
  }, [isSelected]);

  return (
    <div
      className={`option ${isSelected ? "selected" : ""} `}
      onClick={() => setIsSelected(!isSelected)}
    >
      {option.name}
    </div>
  );
}

export default Option;
