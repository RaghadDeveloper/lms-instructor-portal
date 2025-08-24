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
import Posts from "./pages/Posts/Posts";
import Courses from "./pages/Courses/Courses";
import Profile from "./pages/Profile/Profile";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import LessonInfo from "./components/LessonInfo/LessonInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthFromToken, setUserFromToken } from "./features/auth/authSlice";
import LessonEditor from "./pages/LessonEditor/LessonEditor";
import CreateLesson from "./pages/CreateLesson/CreateLesson";
import UpdateCourse from "./pages/UpdateCourse/UpdateCourse";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import QuizDetails from "./pages/QuizDetails/QuizDetails";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import EditQuestion from "./pages/EditQuestion/EditQuestion";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import FeedBack from "./pages/FeedBack/FeedBack";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      dispatch(setAuthFromToken(token));
    }
    if (user) {
      dispatch(setUserFromToken(user));
    }
  }, [dispatch]);

  return (
    <BrowserRouter basename="/lms-instructor-portal/">
      <ScrollToTop />
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
            <Route path="/posts" element={<Posts />} />
            <Route path="/courses">
              <Route index element={<Courses />} />
              <Route path="create" element={<CreateCourse />} />
              <Route path="edit/:courseId" element={<UpdateCourse />} />
              <Route path=":courseId" element={<CourseDetails />}>
                <Route index element={<CourseInfo />} />
                <Route path="lesson/:lessonId" element={<LessonInfo />} />
                <Route
                  path="lesson/:lessonId/pdf/:pdfId"
                  element={<LessonInfo />}
                />
              </Route>
              <Route path="lesson/create" element={<CreateLesson />} />
              <Route path=":courseId/quiz/:quizId" element={<QuizDetails />} />
              <Route path=":courseId/quiz/create" element={<CreateQuiz />} />
              <Route
                path=":courseId/quiz/:quizId/create-question"
                element={<EditQuestion />}
              />
              <Route
                path=":courseId/quiz/edit-question/:questionId"
                element={<EditQuestion />}
              />
              <Route
                path=":courseId/lesson/create"
                element={<LessonEditor />}
              />
              <Route
                path=":courseId/lesson/edit/:lessonId"
                element={<LessonEditor />}
              />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
