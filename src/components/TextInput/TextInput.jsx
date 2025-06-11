import "./TextInput.css";

function TextInput({ id, type, label, name, value, onChange, onClick }) {
  return (
    <div className="field">
      <input
        id={id}
        type={type}
        step="any"
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
      {name === "tags" && (
        <button type="button" className="remove-tag" onClick={onClick}>
          &times;
        </button>
      )}
    </div>
  );
}

export default TextInput;
