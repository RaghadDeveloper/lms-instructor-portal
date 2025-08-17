import "./MainPage.css";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesThunk";
import {
  getMyFollowers,
  getProfile,
} from "../../features/profile/profileThunks";
import SquareLoader from "../../components/SquareLoader/SquareLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Forbidden from "../../components/Forbidden/Forbidden";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import {
  coursesStatistics,
  earningsStatistics,
  followsStatistics,
  lessonsStatistics,
} from "../../features/statistics/statisticsThunk";

function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { status, error: catError } = useSelector((state) => state.categories);
  const { loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyFollowers());

    dispatch(coursesStatistics(2025));
    dispatch(lessonsStatistics(2025));
    dispatch(followsStatistics(2025));
    dispatch(earningsStatistics(2025));
  }, [dispatch]);

  if (loading || status === "loading") return <SquareLoader />;

  if (catError?.status === 403) return <Forbidden />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className={`main-page ${theme}`}>
      <Navigation />
      <main>
        <Header />
        <div className="content">
          <Outlet />
          <ScrollToTopButton />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
