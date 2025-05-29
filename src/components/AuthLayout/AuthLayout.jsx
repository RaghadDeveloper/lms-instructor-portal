import "./AuthLayout.css";

function AuthLayout({ imageSrc, children }) {
  return (
    <div className="auth-layout">
      <div className="auth-layout-image">
        <img src={imageSrc} alt="auth image" width={"600px"} />
      </div>
      <div className="auth-layout-form">{children}</div>
    </div>
  );
}

export default AuthLayout;
