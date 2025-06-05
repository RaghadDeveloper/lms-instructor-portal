import "./Button.css";
function Button({ children }) {
  return <button className="btn-primary">{children}</button>;
}

export default Button;
