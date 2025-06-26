import "./Button.css";
function Button({ children, onClick, type, className, disabled }) {
  return (
    <button
      type={type}
      className={`btn ${className} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
