import "./Signup.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";
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
    <AuthLayout>
      <AuthHeader
        title={signupData.title}
        description={signupData.description}
      />

      <AuthForm>
        <TextInput id="email" type="email" label="Email" />

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
