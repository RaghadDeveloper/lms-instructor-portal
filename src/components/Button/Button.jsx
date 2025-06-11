import "./Button.css";
function Button({ children, onClick, type, className }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
