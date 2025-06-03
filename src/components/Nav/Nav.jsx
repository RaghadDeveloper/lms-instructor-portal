import "./Nav.css";
import { NavLink } from "react-router-dom";

function Nav({ Icon, title, link, disableActive = false }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `nav ${isActive && !disableActive ? "active" : ""}`
      }
      to={link}
    >
      {Icon && <Icon className="icon" />}
      {title && <h2>{title}</h2>}
    </NavLink>
  );
}

export default Nav;
