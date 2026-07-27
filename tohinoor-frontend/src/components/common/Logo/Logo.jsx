import "./Logo.css";
import logo from "../../../assets/images/logos/logo-300.png";

export default function Logo({ className = "" }) {
    return (
        <img
            className={`logo ${className}`}
            src={logo}
            alt="Tohinoor"
        />
    );
}