import "./Logo.css";
import logo from "../../../assets/images/logos/logo-300.png";

export default function Logo({
    size = 115,
    className = "",
}) {
    return (
        <img
            src={logo}
            alt="Tohinoor"
            className={`logo ${className}`}
            style={{
                "--logo-size": `${size}px`,
            }}
        />
    );
}