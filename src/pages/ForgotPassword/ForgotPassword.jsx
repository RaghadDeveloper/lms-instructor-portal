import AuthForm from "../../components/AuthForm/AuthForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
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
        <TextInput id="email" type="email" label="Email" />
        <Button>Continue</Button>
      </AuthForm>
    </AuthLayout>
  );
}

export default ForgotPassword;
