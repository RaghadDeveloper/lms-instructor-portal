import "./AuthForm.css";

function AuthForm({ children, onSubmit }) {
  return (
    <form
      className="position-relative d-flex flex-column gap-3"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthForm;
