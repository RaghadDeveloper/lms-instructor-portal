import "./Signup.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import TextInput from "../../components/TextInput/TextInput";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/auth/authThunks";

function Signup() {
  const signupData = {
    title: (
      <>
        Sign up to <span> NEXORA</span> Academy
      </>
    ),
    description:
      "Welcome to NEXORA Academy! Sign up to create your account and start learning.",
  };

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <AuthLayout>
      <AuthHeader
        title={signupData.title}
        description={signupData.description}
      />

      <AuthForm onSubmit={handleSubmit}>
        <TextInput
          id="user-name"
          type="text"
          label={"User Name"}
          name={"username"}
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          id="email"
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordInput
          id="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />

        <Button>Sign up</Button>
        <InlineActionText>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </InlineActionText>
      </AuthForm>
      {error && <p className="error">{error}</p>}
    </AuthLayout>
  );
}

export default Signup;
