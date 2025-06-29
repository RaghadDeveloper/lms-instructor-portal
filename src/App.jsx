import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Verification from "./pages/Verification/Verification";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProfileSetup from "./pages/ProfileSetup/ProfileSetup";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute ";
import MainPage from "./pages/MainPage/MainPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Articles from "./pages/Articles/Articles";
import Courses from "./pages/Courses/Courses";
import Profile from "./pages/Profile/Profile";
import CourseStatistics from "./pages/CourseStatistics/CourseStatistics";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import CourseEditor from "./pages/CourseEditor/CourseEditor";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import VideoInfo from "./components/VideoInfo/VideoInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuthFromToken } from "./features/auth/authSlice";
import { fetchCategories } from "./features/categories/categoriesThunk";
import VideoEditor from "./pages/VideoEditor/VideoEditor";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuthFromToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [dispatch, status]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verification" element={<Verification />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complete-profile" element={<ProfileSetup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/courses">
              <Route index element={<Courses />} />
              <Route path="create" element={<CourseEditor />} />
              <Route path="edit/:courseId" element={<CourseEditor />} />
              <Route path=":courseId" element={<CourseDetails />}>
                <Route index element={<CourseInfo />} />
                <Route path="lesson/:lessonId" element={<VideoInfo />} />
              </Route>
              <Route path=":courseId/lesson/create" element={<VideoEditor />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/course-statistics" element={<CourseStatistics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
