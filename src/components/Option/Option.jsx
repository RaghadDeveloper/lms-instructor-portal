import { useEffect, useState } from "react";
import "./Option.css";

function Option({ option, onSelect, onDeselect, userCategories }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) onSelect(option.id);
    else onDeselect(option.id);
  }, [isSelected]);

  useEffect(() => {
    setIsSelected(userCategories?.some((cat) => cat.id === option.id));
  }, [userCategories, option.id]);

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
