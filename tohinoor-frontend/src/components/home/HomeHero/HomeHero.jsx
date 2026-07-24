import "./HomeHero.css";
import Logo from "../../common/Logo";
import LoginButton from "../../common/LoginButton";

export default function HomeHero() {
  return (
    <header className="home-header">
      <div className="home-header__logo">
        <Logo size={120} />
      </div>

      <div className="home-header__actions">
        <LoginButton />
      </div>
    </header>
  );
}
