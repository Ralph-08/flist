import "./Navbar.scss";
import menuIcon from "../../assets/icons/menu-button.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleMenu = () => {
    !menuDisplay ? setMenuDisplay(true) : setMenuDisplay(false);
  };

  return (
    <>
      <nav className="nav">
        <p className="nav__logo">Flist</p>
        <img
          onClick={handleMenu}
          className="nav__menu"
          src={menuIcon}
          alt="menu-icon"
        />
      </nav>

      {menuDisplay && (
        <ul className="menu">
          <li className="menu__item">
            <NavLink
              to="/dashboard"
              className="menu__link"
              onClick={handleMenu}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/items" className="menu__link" onClick={handleMenu}>
              Items
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/orders" className="menu__link" onClick={handleMenu}>
              Orders
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/profile" className="menu__link" onClick={handleMenu}>
              Profile
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/logout"
              className="menu__link menu__link--logout"
              onClick={handleMenu}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;
