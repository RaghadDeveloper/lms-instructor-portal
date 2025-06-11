import "./Select.css";

function Select({ text, options }) {
  return (
    <select required>
      <option value="" disabled defaultValue hidden>
        {text}
      </option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
