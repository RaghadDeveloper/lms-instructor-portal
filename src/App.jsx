import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Verification from "./pages/Verification/Verification";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProfileSetup from "./pages/ProfileSetup/ProfileSetup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verification" element={<Verification />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complete-profile" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
