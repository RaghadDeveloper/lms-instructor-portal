import AuthForm from "../../components/AuthForm/AuthForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import "./ResetPassword.css";
function ResetPassword() {
  const headerData = {
    title: "Reset Password",
    description: "Please write your new password.",
  };

  return (
    <AuthLayout>
      <AuthHeader
        title={headerData.title}
        description={headerData.description}
      />
      <AuthForm>
        <PasswordInput id="password" label="Password" />
        <PasswordInput id="confirm-password" label="Confirm Password" />

        <Button type={"submit"} className={"primary"}>
          Confirm password
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}

export default ResetPassword;
