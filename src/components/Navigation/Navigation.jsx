import "./Navigation.css";
import { useState } from "react";
import Nav from "../Nav/Nav";
import { TbDashboard, TbMessages } from "react-icons/tb";
import { FiChevronLeft } from "react-icons/fi";
import { MdNotificationsActive, MdSwapHoriz } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import Logo from "./../../assets/images/logo.png";
import { PiArticleNyTimesLight } from "react-icons/pi";
import { RiLineChartLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

function Navigation() {
  const [nav, setNav] = useState(false);

  return (
    <div className={`navigation ${nav ? "active" : ""}`}>
      <span className="menu" onClick={() => setNav((prev) => !prev)}>
        <FiChevronLeft />
      </span>
      <header>
        <img src={Logo} alt="logo" className="logo" width={30} />
        <h1>
          <span>NEXORA</span> Academy
        </h1>
      </header>

      <Nav Icon={TbDashboard} title={"Dashboard"} link={"/"} />
      <Nav Icon={FaBookOpen} title={"Courses"} link={"/courses"} />
      <Nav
        Icon={RiLineChartLine}
        title={"Course Statisics"}
        link={"/course-statistics"}
      />

      <div className="line"></div>

      <Nav Icon={AiOutlineUser} title={"Profile"} link={"/profile"} />
      <Nav Icon={TbMessages} title={"Messages"} link={"/messages"} />
      <Nav
        Icon={MdNotificationsActive}
        title={"Notifications"}
        link={"/notifications"}
      />
      <Nav Icon={PiArticleNyTimesLight} title={"Articles"} link={"/articles"} />

      <div className="line"></div>

      <Nav
        Icon={MdSwapHoriz}
        title={"Switch To Light Mode"}
        disableActive={true}
      />
      <Nav Icon={HiOutlineLogout} title={"Logout"} disableActive={true} />
    </div>
  );
}

export default Navigation;
