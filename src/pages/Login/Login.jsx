import "./Login.css";
import signup from "./../../assets/images/signup.png";
import PasswordField from "../../components/PasswordInput/PasswordInput";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import EmailField from "../../components/EmailInput/EmailInput";
import UserState from "../../components/UserState/UserState";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Login() {
  const loginData = {
    title: "Log in to",
    description:
      "Welcome back, Instructor! Log in to manage your courses and connect with your students.",
  };
  return (
    <AuthLayout imageSrc={signup}>
      <AuthHeader title={loginData.title} description={loginData.description} />

      <AuthForm>
        <EmailField />

        <PasswordField id="password" label="Password" page="login" />

        <Button>Log in</Button>
        <UserState>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </UserState>
      </AuthForm>
    </AuthLayout>
  );
}

export default Login;
