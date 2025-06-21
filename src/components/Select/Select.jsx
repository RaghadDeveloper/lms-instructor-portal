import "./Select.css";

function Select({ text, options, name, onChange, value }) {
  return (
    <select required name={name} value={value} onChange={onChange}>
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
