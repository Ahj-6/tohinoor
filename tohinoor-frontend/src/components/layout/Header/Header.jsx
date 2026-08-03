import "./Header.css";
import "./Header-responsive.css";

import Logo from "../../common/Logo";
import LoginButton from "../../common/LoginButton";
import StarField from "../../common/StarField";

import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <StarField variant="header">
      <header className="header">

        <div className="header__logo">
          <Logo size={52} />
        </div>

        <HeaderNav />

        <div className="header__actions">
          <LoginButton />
        </div>

      </header>
    </StarField>
  );
}