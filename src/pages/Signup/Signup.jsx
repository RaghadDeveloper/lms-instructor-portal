import "./Signup.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/authThunks";
import { headers } from "../../data/headers";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AuthErrorReset from "../../components/AuthErrorReset/AuthErrorReset";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!isValidEmail(formData.email)) errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.password_confirmation)
      errors.password_confirmation = "Passwords do not match";
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
    setHasSubmitted(true);
    dispatch(signup(formData));
  };

  useEffect(() => {
    if (hasSubmitted && !loading && !error && isAuthenticated) {
      navigate("/verification");
    }
  }, [hasSubmitted, loading, error, isAuthenticated, navigate]);

  return (
    <AuthLayout>
      <AuthErrorReset />
      <AuthHeader
        title={headers.signup.title}
        description={headers.signup.description}
      />

      <AuthForm onSubmit={handleSubmit}>
        <TextInput
          id="user-name"
          type="text"
          label={"User Name"}
          name={"username"}
          value={formData.username}
          onChange={handleChange}
          disabled={loading}
        />
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
          id="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          disabled={loading}
        />

        <Button type={"submit"} className={"primary"} disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}{" "}
        </Button>
        <InlineActionText>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </InlineActionText>

        {formErrors.username && (
          <ErrorMessage>{formErrors.username}</ErrorMessage>
        )}
        {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
        {formErrors.password && (
          <ErrorMessage>{formErrors.password}</ErrorMessage>
        )}
        {formErrors.password_confirmation && (
          <ErrorMessage>{formErrors.password_confirmation}</ErrorMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </AuthForm>
    </AuthLayout>
  );
}

export default Signup;
