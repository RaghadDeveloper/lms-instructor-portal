import "./Signup.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import signup from "./../../assets/images/signup.png";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import EmailInput from "../../components/EmailInput/EmailInput";
import UserState from "../../components/UserState/UserState";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Signup() {
  const signupData = {
    title: "Sign up to",
    description:
      "Welcome to NEXORA Academy! Sign up to create your account and start learning.",
  };

  return (
    <AuthLayout imageSrc={signup}>
      <AuthHeader
        title={signupData.title}
        description={signupData.description}
      />

      <AuthForm>
        <EmailInput />

        <PasswordInput id="password" label="Password" />
        <PasswordInput id="confirm-password" label="Confirm Password" />

        <Button>Sign up</Button>
        <UserState>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </UserState>
      </AuthForm>
    </AuthLayout>
  );
}

export default Signup;
