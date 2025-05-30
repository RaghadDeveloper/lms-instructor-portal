import "./Verification.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import signup from "./../../assets/images/signup.png";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import OTPInputGroup from "../../components/OTPInputGroup/OTPInputGroup ";
import InlineActionText from "../../components/InlineActionText/InlineActionText";
import AuthForm from "../../components/AuthForm/AuthForm";

function Verification() {
  const verificationData = {
    titlt: "OTP Verification",
    description:
      "To confirm your Email, please enter the 6-digit code we sent to you.",
  };
  return (
    <AuthLayout imageSrc={signup}>
      <div className="verification">
        <AuthHeader
          title={verificationData.titlt}
          description={verificationData.description}
        />
        <OTPInputGroup length={6} />
        <InlineActionText>
          Don't recieve code? <span>Resend</span>
        </InlineActionText>
        <Button type="primary">Confirm code</Button>
      </div>
    </AuthLayout>
  );
}

export default Verification;
