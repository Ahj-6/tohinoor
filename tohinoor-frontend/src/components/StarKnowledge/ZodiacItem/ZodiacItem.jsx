import "./ZodiacItem.css";
import "./ZodiacItem-responsive.css";

import { Link } from "react-router-dom";

export default function ZodiacItem({ zodiac }) {
  const Symbol = zodiac.symbol;

  return (
    <Link
      className="zodiac-item"
      to={`/star-knowledge/${zodiac.name.toLowerCase()}`}
    >
      <div className="zodiac-item__circle">
        <Symbol />
      </div>

      <span className="zodiac-item__name">{zodiac.name}</span>
    </Link>
  );
}
