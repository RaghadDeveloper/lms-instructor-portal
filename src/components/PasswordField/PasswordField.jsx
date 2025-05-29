import { useState } from "react";
import "./PasswordField.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function PasswordField({ id, label }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password">
      <input id={id} type={show ? "text" : "password"} required />
      <label htmlFor={id}>{label}</label>
      <span className="icon" onClick={() => setShow(!show)}>
        {show ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
    </div>
  );
}

export default PasswordField;
