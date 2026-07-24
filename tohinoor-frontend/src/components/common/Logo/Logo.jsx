import "./Logo.css";
import logo from "../../../assets/images/logos/logo-300.png";

export default function Logo({ size = 110 }) {
    return (
        <img
            className="logo"
            src={logo}
            alt="Tohinoor"
            style={{
                width: size,
                height: "auto",
            }}
        />
    );
}