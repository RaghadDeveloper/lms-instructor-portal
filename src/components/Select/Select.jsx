import "./Select.css";

function Select({ text, options, name, onChange, value, disabled }) {
  return (
    <select
      required
      className={`${disabled ? "disabled" : ""}`}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="" disabled hidden>
        {text}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
