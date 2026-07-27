import "./HomeCard.css";
import { Link } from "react-router-dom";

export default function HomeCard({ card }) {
  const { title, image, href, linkText } = card;

  return (
    <Link to={href} className="home-card">
      <div className="home-card__image-wrapper">
        {image && <img className="home-card__image" src={image} alt={title} />}
      </div>

      <div className="home-card__content">
        <h2 className="home-card__title">{title}</h2>
        <div className="home-card__footer">
          <hr className="home-card__divider" />

          <span className="home-card__link">{linkText}</span>
        </div>
      </div>
    </Link>
  );
}
