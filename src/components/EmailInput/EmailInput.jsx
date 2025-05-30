import "./EmailInput.css";

function EmailInput() {
  return (
    <div className="email">
      <input id="email" type="email" required />
      <label htmlFor="email">Email</label>
    </div>
  );
}

export default EmailInput;
