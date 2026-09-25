import { NavLink } from "react-router-dom";
import { headerMenu } from "../../../constants/headerMenu";

import "./HeaderNav.css";

export default function HeaderNav() {
  return (
    <nav className="header-nav">
{headerMenu.map((item) =>
  item.disabled ? (
    <span
      key={item.id}
      className="header-nav__link header-nav__link--disabled"
      aria-disabled="true"
    >
      {item.title}
    </span>
  ) : (
    <NavLink
      key={item.id}
      to={item.path}
      className={({ isActive }) =>
        isActive
          ? "header-nav__link header-nav__link--active"
          : "header-nav__link"
      }
    >
      {item.title}
    </NavLink>
  )
)}
    </nav>
  );
}