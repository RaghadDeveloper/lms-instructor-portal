import "./Nav.css";
import { NavLink } from "react-router-dom";

function Nav({ Icon, title, link, onClick }) {
  if (link)
    return (
      <NavLink
        className={({ isActive }) => `nav ${isActive ? "active" : ""}`}
        to={link}
      >
        {Icon && <Icon className="icon" />}
        {title && <h2>{title}</h2>}
      </NavLink>
    );

  return (
    <div className="nav" onClick={onClick}>
      {Icon && <Icon className="icon" />}
      {title && <h2>{title}</h2>}
    </div>
  );
}

export default Nav;
