import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/authThunks";
import { headers } from "../../data/headers";
import FormLayout from "../../components/FormLayout/FormLayout";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormBody from "../../components/FormBody/FormBody";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AuthErrorReset from "../../components/AuthErrorReset/AuthErrorReset";
import {
  messaging,
  getToken,
} from "./../../features/notifications/firebase-config";

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
    fcm_token: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.register(
          "/lms-instructor-portal/firebase-messaging-sw.js"
        );

        const currentToken = await getToken(messaging, {
          vapidKey:
            "BNRs-YARm0VDBWztIXD7Kc58hMgtjGjyxGFxfjIkWLb_0NS5OLTSrfbQ3YMu8bxpoAUfC_gPD3QZGxeUUdu10t0",
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          setFormData((prev) => ({ ...prev, fcm_token: currentToken }));
        } else {
          console.warn(
            "No registration token available. Request permission to generate one."
          );
        }
      } else {
        console.warn("Notification permission not granted.");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  useEffect(() => {
    requestPermissionAndGetToken();
  }, []);

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
      navigate("/verification", { state: { from: "signup" } });
    }
  }, [hasSubmitted, loading, error, isAuthenticated, navigate]);

  return (
    <FormLayout>
      <AuthErrorReset />
      <FormHeader
        title={headers.signup.title}
        description={headers.signup.description}
      />

      <FormBody onSubmit={handleSubmit}>
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

        {formErrors.username && <ErrorMessage error={formErrors.username} />}
        {formErrors.email && <ErrorMessage error={formErrors.email} />}
        {formErrors.password && <ErrorMessage error={formErrors.password} />}
        {formErrors.password_confirmation && (
          <ErrorMessage error={formErrors.password_confirmation} />
        )}
        {error && <ErrorMessage error={error} />}
      </FormBody>
    </FormLayout>
  );
}

export default Signup;
