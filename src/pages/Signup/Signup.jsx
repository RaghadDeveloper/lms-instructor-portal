import "./Signup.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import signup from "./../../assets/images/signup.png";
import Button from "../../components/Button/Button";
import { FaRegEye } from "react-icons/fa";
import PasswordField from "../../components/PasswordField/PasswordField";

function Signup() {
  return (
    <AuthLayout imageSrc={signup}>
      <header>
        <h2>
          Sign up to <span>NEXORA</span> Academy
        </h2>
        <p>
          Welcome to NEXORA Academy! Sign up to create your account and start
          learning.
        </p>
      </header>

      <form>
        <div className="email">
          <input id="email" type="email" required />
          <label htmlFor="email">Email</label>
        </div>

        {/* <div className="password">
          <input id="password" type="password" required />
          <label htmlFor="password">Password</label>
          <FaRegEye className="icon" />
        </div>

        <div className="password">
          <input id="confirm-password" type="password" required />
          <label htmlFor="confirm-password">Confirm password</label>
        </div> */}

        <PasswordField id="password" label="Password" />
        <PasswordField id="confirm-password" label="Confirm Password" />

        <Button>Sign up</Button>
        <p className="user-state">
          Already have an account? <span>Log in</span>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Signup;
