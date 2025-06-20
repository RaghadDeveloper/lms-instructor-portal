import "./Select.css";

function Select({ text, options }) {
  return (
    <select required defaultValue="">
      <option value="" disabled hidden>
        {text}
      </option>
      {options.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </select>
  );
}

export default Select;
