import "./AuthLayout.css";
import img from "./../../assets/images/Subtract.png";

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <img src={img} className="background" alt="background" />
      <div className="auth-layout-form">{children}</div>
    </div>
  );
}

export default AuthLayout;
