import "./AuthForm.css";

function AuthForm({ children }) {
  return (
    <form className="position-relative d-flex flex-column gap-3">
      {children}
    </form>
  );
}

export default AuthForm;
