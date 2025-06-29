import "./MainPage.css";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesThunk";

function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [dispatch, status]);
  return (
    <div className={`main-page ${theme}`}>
      <Navigation />
      <main>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
