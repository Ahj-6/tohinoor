import "./LoginButton.css";
import { BiSolidUser } from "../../../icons";

export default function LoginButton() {
  return (
    <button className="login-button">
      <span className="login-button__content">
        <span className="login-button__label">ورود اعضا</span>
        <BiSolidUser className="login-button__icon" />
      </span>
    </button>
  );
}
