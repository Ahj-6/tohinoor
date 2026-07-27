import "./HomeHero.css";
import Logo from "../../common/Logo";

export default function HomeHero() {
    return (
        <header className="home-header">
            <div className="home-header__logo">
                <Logo className="home-logo" />
            </div>
        </header>
    );
}
