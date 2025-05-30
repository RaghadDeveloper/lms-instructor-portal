import "./Signup.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import signup from "./../../assets/images/signup.png";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import EmailInput from "../../components/EmailInput/EmailInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Signup() {
  const signupData = {
    title: (
      <>
        Sign up to <span> NEXORA</span> Academy
      </>
    ),
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
        <InlineActionText>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </InlineActionText>
      </AuthForm>
    </AuthLayout>
  );
}

export default Signup;
