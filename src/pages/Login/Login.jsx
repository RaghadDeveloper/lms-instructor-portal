import "./Login.css";
import PasswordField from "../../components/PasswordInput/PasswordInput";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Login() {
  const loginData = {
    title: (
      <>
        Log in to <span> NEXORA</span> Academy
      </>
    ),
    description:
      "Welcome back, Instructor! Log in to manage your courses and connect with your students.",
  };
  return (
    <AuthLayout>
      <AuthHeader title={loginData.title} description={loginData.description} />

      <AuthForm>
        <TextInput id="email" type="email" label="Email" />

        <PasswordField id="login-password" label="Password" page="login" />

        <Button>Log in</Button>
        <InlineActionText>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </InlineActionText>
      </AuthForm>
    </AuthLayout>
  );
}

export default Login;
