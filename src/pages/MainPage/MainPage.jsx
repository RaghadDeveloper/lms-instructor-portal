import "./MainPage.css";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesThunk";
import SquareLoader from "../../components/SquareLoader/SquareLoader";
import Forbidden from "../../components/Forbidden/Forbidden";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import {
  coursesStatistics,
  earningsStatistics,
  followsStatistics,
  lessonsStatistics,
} from "../../features/statistics/statisticsThunk";
import { getProfile } from "../../features/profile/profileThunks";

function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { status, error: catError } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(getProfile());

    dispatch(coursesStatistics(2025));
    dispatch(lessonsStatistics(2025));
    dispatch(followsStatistics(2025));
    dispatch(earningsStatistics(2025));
  }, [dispatch]);

  if (status === "loading") return <SquareLoader />;

  if (catError?.status === 403) return <Forbidden />;

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
