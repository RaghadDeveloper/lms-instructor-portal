import "./Forbidden.css";
import forbiddenImg from "./../../assets/images/403Error.png";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { resendOTP } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Forbidden() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const sendOTP = async () => {
    const resultAction = await dispatch(resendOTP());
    if (resendOTP.fulfilled.match(resultAction)) navigate("/verification");
  };

  return (
    <div className="forbidden">
      <img src={forbiddenImg} alt="403 img" />
      <p>
        Your email address has not been verified. Please click on the button
        below to verify your email address.
      </p>
      <Button className={"border"} onClick={sendOTP}>
        Resend verifiation code
      </Button>
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export default Forbidden;
