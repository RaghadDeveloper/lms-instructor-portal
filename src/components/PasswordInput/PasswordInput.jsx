import { useState } from "react";
import "./PasswordInput.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function PasswordInput({ id, label, page }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password">
      <input id={id} type={show ? "text" : "password"} required />
      <label htmlFor={id} className="label">
        {label}
      </label>
      <span className="icon" onClick={() => setShow(!show)}>
        {show ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      {page === "login" && (
        <Link to="/forgot-password" className="forget">
          Forgot Password?
        </Link>
      )}
    </div>
  );
}

export default PasswordInput;
