import "./Navbar.scss";
import menuIcon from "../../assets/icons/menu-button.svg";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [failedAuth, setFailedAuth] = useState(false);

  const navigate = useNavigate();

  const handleMenu = () => {
    !menuDisplay ? setMenuDisplay(true) : setMenuDisplay(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
    } else {
      setFailedAuth(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <section className="nav__container">
        <nav className="nav">
          <section className="nav__top-left">
            {!failedAuth && (
              <img
                onClick={handleMenu}
                className="nav__menu nav__menu--desktop"
                src={menuIcon}
                alt="menu-icon"
              />
            )}
            <img src={Logo} className="nav__logo" />
          </section>
          {!failedAuth && (
            <img
              onClick={handleMenu}
              className="nav__menu nav__menu--mobile"
              src={menuIcon}
              alt="menu-icon"
            />
          )}
        </nav>
      </section>

      {menuDisplay && (
        <section className="menu__background">
          <ul className="menu">
            <li className="menu__btn" onClick={handleMenu}>
              <img className="menu__close" src={closeIcon} alt="close-icon" />
            </li>

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
              <NavLink
                to="/profile"
                className="menu__link"
                onClick={handleMenu}
              >
                Profile
              </NavLink>
            </li>
            <li className="menu__item">
              <button
                className="menu__link menu__link--logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default Navbar;
