import "./ResetPassword.css";
import { headers } from "../../data/headers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetPassword } from "../../features/auth/authThunks";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AuthErrorReset from "../../components/AuthErrorReset/AuthErrorReset";
function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validateForm() {
    const errors = {};
    if (!formData.password) errors.password = "Password is required";
    if (!formData.password_confirmation) {
      errors.password_confirmation = "Confirmation is required";
    } else if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setHasSubmitted(true);
    dispatch(resetPassword(formData));
  }

  useEffect(() => {
    if (hasSubmitted && !loading && !error) {
      navigate("/login");
    }
  }, [hasSubmitted, loading, error, navigate]);

  return (
    <AuthLayout>
      <AuthErrorReset />
      <AuthHeader
        title={headers.resetPassword.title}
        description={headers.resetPassword.description}
      />
      <AuthForm onSubmit={handleSubmit}>
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
          Confirm password
        </Button>
      </AuthForm>
      {formErrors.password && (
        <ErrorMessage>{formErrors.password}</ErrorMessage>
      )}
      {formErrors.password_confirmation && (
        <ErrorMessage>{formErrors.password_confirmation}</ErrorMessage>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AuthLayout>
  );
}

export default ResetPassword;
