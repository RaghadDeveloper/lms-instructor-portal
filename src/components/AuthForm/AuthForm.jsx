import "./AuthForm.css";

function AuthForm({ children, onSubmit }) {
  return (
    <form className="auth-layout-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default AuthForm;
