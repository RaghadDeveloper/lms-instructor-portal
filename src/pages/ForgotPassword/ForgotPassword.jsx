import "./ForgotPassword.css";
import { headers } from "../../data/headers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/auth/authThunks";
import FormBody from "../../components/FormBody/FormBody";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormLayout from "../../components/FormLayout/FormLayout";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AuthErrorReset from "../../components/AuthErrorReset/AuthErrorReset";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  function handleChange(e) {
    setEmail(e.target.value);
    if (formError) setFormError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setFormError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    setHasSubmitted(true);
    dispatch(forgotPassword({ email }));
  }

  useEffect(() => {
    if (hasSubmitted && !loading && !error && email) {
      navigate("/verification", { state: { from: "forgot-password" } });
    }
  }, [hasSubmitted, loading, error, navigate, email]);

  return (
    <FormLayout>
      <AuthErrorReset />
      <FormHeader
        title={headers.forgotPassword.title}
        description={headers.forgotPassword.description}
      />
      <FormBody onSubmit={handleSubmit}>
        <TextInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={handleChange}
          disabled={loading}
        />
        <Button type={"submit"} className={"primary"} disabled={loading}>
          Continue
        </Button>
        {formError && <ErrorMessage error={formError} />}
        {formError && <ErrorMessage error={formError} />}
      </FormBody>
    </FormLayout>
  );
}

export default ForgotPassword;
