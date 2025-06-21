import "./TextArea.css";

function TextArea({ id, label, name, value, onChange, disabled }) {
  return (
    <div className="textarea">
      <textarea
        id={id}
        placeholder=" "
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default TextArea;
