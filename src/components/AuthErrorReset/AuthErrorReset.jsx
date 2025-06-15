import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "../../features/auth/authSlice";

const AuthErrorReset = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location.pathname, dispatch]);

  return null;
};

export default AuthErrorReset;
