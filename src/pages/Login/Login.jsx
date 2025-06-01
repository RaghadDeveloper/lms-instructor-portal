import "./Login.css";
import PasswordField from "../../components/PasswordInput/PasswordInput";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginHeader } from "../../data/headers";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <AuthLayout>
      <AuthHeader
        title={loginHeader.title}
        description={loginHeader.description}
      />

      <AuthForm onSubmit={handleSubmit}>
        <TextInput
          id="email"
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordField
          id="login-password"
          label="Password"
          page="login"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button>Log in</Button>
        <InlineActionText>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </InlineActionText>
      </AuthForm>
    </AuthLayout>
  );
}

export default Login;
