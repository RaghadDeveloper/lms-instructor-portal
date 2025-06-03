import "./MainPage.css";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";

function MainPage() {
  return (
    <div className="main">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
