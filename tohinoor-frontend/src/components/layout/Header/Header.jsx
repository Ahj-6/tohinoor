import { useState } from "react";

import "./Header.css";
import "./Header-responsive.css";

import Logo from "../../common/Logo";
import LoginButton from "../../common/LoginButton";
import StarField from "../../common/StarField";

import HeaderNav from "./HeaderNav";
import { headerMenu } from "../../../constants/headerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <StarField variant="header">
      <header className="header">
        {/* Hamburger */}
        <button
          className="header__menu"
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Logo */}
        <a className="header__logo" href="/">
          <Logo size={62} />
        </a>

        {/* Desktop Navigation */}
        <HeaderNav />

        {/* Login */}
        <div className="header__actions">
          <LoginButton />
        </div>

        {/* Mobile Menu */}
        <nav
          className={`header__mobile-menu ${
            isMenuOpen ? "header__mobile-menu--open" : ""
          }`}
        >
          {headerMenu.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="header__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </header>
    </StarField>
  );
}
