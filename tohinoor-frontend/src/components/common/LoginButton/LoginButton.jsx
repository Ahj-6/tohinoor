import "./LoginButton.css";
import { BiSolidUser } from "../../../icons";

export default function LoginButton() {
    return (
        <button className="login-button">

            <span className="login-button__text">
                ورود اعضا  <BiSolidUser className="login-button__icon" />
            </span>
        </button>
    );
}