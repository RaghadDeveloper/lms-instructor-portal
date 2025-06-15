import "./ErrorMessage.css";

function ErrorMessage({ children }) {
  return <p className="error">{children}</p>;
}

export default ErrorMessage;
