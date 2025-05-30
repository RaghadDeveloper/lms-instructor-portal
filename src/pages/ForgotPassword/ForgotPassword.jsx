import AuthForm from "../../components/AuthForm/AuthForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import EmailInput from "../../components/EmailInput/EmailInput";
import "./ForgotPassword.css";

function ForgotPassword() {
  const headerData = {
    title: "Forgot Password",
    description: "Enter your email to reset your password.",
  };
  return (
    <AuthLayout>
      <AuthHeader
        title={headerData.title}
        description={headerData.description}
      />
      <AuthForm>
        <EmailInput />
        <Button>Continue</Button>
      </AuthForm>
    </AuthLayout>
  );
}

export default ForgotPassword;
