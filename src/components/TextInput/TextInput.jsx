import "./TextInput.css";

function EmailInput({ id, type, label }) {
  return (
    <div className="email">
      <input id={id} type={type} required />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
}

export default EmailInput;
