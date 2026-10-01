import { Link } from "react-router-dom";
import "./PersonCard.css";
import "./PersonCard-responsive.css";

import { zodiacSigns } from "../../../constants/zodiacSigns";
import BtnArrow from "../../../assets/images/icons/btnArrow.svg?react";

export default function PersonCard({ person }) {
  const zodiacId =
    typeof person.zodiac === "object"
      ? person.zodiac?.id
      : null;

  const zodiac = Object.values(zodiacSigns).find(
    (item) => Number(item.id) === Number(zodiacId),
  );

  const ZodiacSymbol = zodiac?.symbol;

  return (
    <article className="person-card">
      <div className="person-card__photo">
        <img src={person.photo} alt={person.name_eng} />
      </div>

      <div className="person-card__content">
        <h3 className="person-card__name">{person.name_eng}</h3>

        <div className="person-card__footer">
          <div className="person-card__meta">
            <span className="person-card__zodiac">
              {ZodiacSymbol && (
                <ZodiacSymbol className="person-card__symbol" />
              )}
            </span>

            <span className="person-card__rating">
              Rate | <span>{person.birth_accuracy?.code ?? "—"}</span>
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/star-knowledge/person/${person.slug}`}
        className="person-card__action"
        aria-label={`مشاهده ${person.name}`}
      >
        <BtnArrow className="person-card__arrow" />
      </Link>
    </article>
  );
}