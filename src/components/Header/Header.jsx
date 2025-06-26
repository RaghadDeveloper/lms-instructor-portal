import "./Header.css";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { TbMessages } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { HiOutlineLogout, HiOutlineMoon } from "react-icons/hi";
import { RiSettingsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import ProfileImg from "./../../assets/images/profileImg.jpg";

function Header() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    dispatch(logout());
    localStorage.clear();
    window.location.reload();
  }

  return (
    <header className={`main-header ${theme}`}>
      <div className="search-bar">
        <input type="text" placeholder="search..." />
        <BiSearch className="icon" />
      </div>

      <div className="header-icons">
        <Link to={"/notifications"}>
          <MdNotificationsActive className="icon" />
        </Link>
        <Link to={"/messages"}>
          <TbMessages className="icon" />
        </Link>

        <div className="divider"></div>
        <HiOutlineMoon className="icon" onClick={toggleTheme} />
        <HiOutlineLogout className="icon" onClick={handleLogout} />
        <div className="divider"></div>
        <Link to={"/profile"}>
          <img className="user" src={ProfileImg} alt="" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
