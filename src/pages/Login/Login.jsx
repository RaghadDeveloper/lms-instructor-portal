import "./Login.css";
import PasswordField from "../../components/PasswordInput/PasswordInput";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginHeader } from "../../data/headers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authThunks";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

        <Button type="submit" className={"primary"}>
          Log in
        </Button>
        <InlineActionText>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </InlineActionText>
      </AuthForm>
      {error && <p>{error}</p>}
    </AuthLayout>
  );
}

export default Login;
