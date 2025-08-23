import "./TextArea.css";

function TextArea({
  id,
  label,
  name,
  value,
  placeholder,
  onChange,
  minLength,
  disabled,
}) {
  return (
    <div className="textarea">
      <textarea
        id={id}
        placeholder={placeholder || " "}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        minLength={minLength}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default TextArea;
