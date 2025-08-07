import "./TextInput.css";

function TextInput({
  id,
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  onClick,
  disabled,
}) {
  return (
    <div className="field">
      <input
        id={id}
        type={type}
        step="any"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        disabled={disabled}
        min={type === "number" ? 0 : null}
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
      {(name === "tags" || onClick) && (
        <button
          type="button"
          className={`remove-tag ${disabled ? "disabled" : ""}`}
          onClick={onClick}
          disabled={disabled}
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default TextInput;
