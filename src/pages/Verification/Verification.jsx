import "./Verification.css";
import { useEffect, useState } from "react";
import { headers } from "../../data/headers";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendOTP, verification } from "../../features/auth/authThunks";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import OTPInputGroup from "../../components/OTPInputGroup/OTPInputGroup";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AuthErrorReset from "../../components/AuthErrorReset/AuthErrorReset";
import AuthForm from "../../components/AuthForm/AuthForm";

function Verification() {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [code, setCode] = useState(Array(6).fill(""));

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (localError) setLocalError("");
  };

  const finalCode = code.join("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(error);
    if (finalCode.length < 6 || code.includes("")) {
      alert("Please enter all 6 digits");
      return;
    }
    setHasSubmitted(true);

    dispatch(verification({ code: finalCode }));
  };

  function handleResend(e) {
    e.preventDefault();
    dispatch(resendOTP());
  }

  const from = location.state?.from;

  useEffect(() => {
    if (hasSubmitted && !loading && !error) {
      if (from === "signup") {
        navigate("/complete-profile");
      } else if (from === "forgot-password") {
        navigate("/reset-password");
      } else {
        navigate("/");
      }
    }
  }, [hasSubmitted, loading, error, navigate, from]);

  return (
    <AuthLayout>
      <AuthErrorReset />
      <AuthForm>
        <div className="verification">
          <AuthHeader
            title={headers.verification.title}
            description={headers.verification.description}
          />
          <OTPInputGroup
            length={6}
            value={code}
            onChange={handleCodeChange}
            disabled={loading}
          />
          <InlineActionText>
            Don't recieve code? <span onClick={handleResend}>Resend</span>
          </InlineActionText>
          <Button
            type="submit"
            className={"primary"}
            onClick={handleSubmit}
            disabled={loading}
          >
            Confirm code
          </Button>
          {localError && <ErrorMessage>{localError}</ErrorMessage>}
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </AuthForm>
    </AuthLayout>
  );
}

export default Verification;
