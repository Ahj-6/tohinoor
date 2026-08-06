import "./HomeHero.css";
import Logo from "../../common/Logo";

export default function HomeHero() {
    return (
        <header className="hero-home-header">
            <div className="hero-home-header__logo">
                <Logo className="hero-home-logo" size={115}/>
            </div>
        </header>
    );
}
