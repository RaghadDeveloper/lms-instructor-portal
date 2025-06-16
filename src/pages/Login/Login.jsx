import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { headers } from "../../data/headers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authThunks";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AuthErrorReset from "../../components/AuthErrorReset/AuthErrorReset";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    else if (!isValidEmail(formData.email)) errors.email = "Email is invalid";

    if (!formData.password) errors.password = "Password is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (formErrors[e.target.name]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout>
      <AuthErrorReset />
      <AuthHeader
        title={headers.login.title}
        description={headers.login.description}
      />

      <AuthForm onSubmit={handleSubmit}>
        <TextInput
          id="email"
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />

        <PasswordInput
          id="login-password"
          label="Password"
          page="login"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />

        <Button type="submit" className={"primary"} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <InlineActionText>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </InlineActionText>

        {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
        {formErrors.password && (
          <ErrorMessage>{formErrors.password}</ErrorMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </AuthForm>
    </AuthLayout>
  );
}

export default Login;
