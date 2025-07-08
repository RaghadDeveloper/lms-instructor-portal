import { useEffect } from "react";
import "./CheckBox.css";

function CheckBox({ id, name, label, value, onChange }) {
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="circle-checkbox"
        value={value}
        onChange={onChange}
        checked={value}
      />
      <label htmlFor="isFree" className="checkbox-label">
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
