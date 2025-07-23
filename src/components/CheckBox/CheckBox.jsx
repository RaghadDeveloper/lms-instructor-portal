import "./CheckBox.css";

function CheckBox({ id, name, label, value, onChange, disabled }) {
  return (
    <div className={`checkbox-wrapper ${disabled ? "disabled" : ""}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="circle-checkbox"
        value={value}
        onChange={onChange}
        checked={value}
        disabled={disabled}
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
