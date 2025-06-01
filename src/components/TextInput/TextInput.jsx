import "./TextInput.css";

function TextInput({ id, type, label, name, value, onChange }) {
  return (
    <div className="email">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
}

export default TextInput;
