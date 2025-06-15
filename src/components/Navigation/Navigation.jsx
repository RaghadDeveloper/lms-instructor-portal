import "./Navigation.css";
import { useState } from "react";
import Nav from "../Nav/Nav";
import { FiChevronLeft } from "react-icons/fi";
import { MdSwapHoriz } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import Logo from "./../../assets/images/logo.png";
import { useTheme } from "../../context/ThemeContext";
import { navigationData } from "../../data/navigationData";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authThunks";

function Navigation() {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    dispatch(logout());
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div
      className={`navigation ${nav ? "active" : ""} ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <span className="menu" onClick={() => setNav((prev) => !prev)}>
        <FiChevronLeft />
      </span>
      <header>
        <img src={Logo} alt="logo" className="logo" width={30} />
        <h1>
          <span>NEXORA</span> Academy
        </h1>
      </header>

      {navigationData.map((navData) => (
        <div key={navData.title}>
          <Nav Icon={navData.icon} title={navData.title} link={navData.link} />
          {navData.title === "Course Statisics" && <div className="line"></div>}
        </div>
      ))}

      <div className="line"></div>

      <Nav
        Icon={MdSwapHoriz}
        title={`${
          theme === "light" ? "Switch To Dark Mode" : "Switch To Light Mode"
        }`}
        onClick={toggleTheme}
      />
      <Nav Icon={HiOutlineLogout} title={"Logout"} onClick={handleLogout} />
    </div>
  );
}

export default Navigation;
