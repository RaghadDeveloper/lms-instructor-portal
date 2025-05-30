import { useState } from "react";
import "./PasswordInput.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function PasswordInput({ id, label, page }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password">
      <input id={id} type={show ? "text" : "password"} required />
      <label htmlFor={id}>{label}</label>
      <span className="icon" onClick={() => setShow(!show)}>
        {show ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      {page === "login" && <p className="forget">Forgot Password?</p>}
    </div>
  );
}

export default PasswordInput;
