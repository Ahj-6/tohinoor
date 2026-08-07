import "./PersonCard.css";
import "./PersonCard-responsive.css";
import { zodiacSigns } from "../../../constants/zodiacSigns";
import BtnArrow from "../../../assets/images/icons/btnArrow.svg?react";

export default function PersonCard({ person }) {
  const zodiac = zodiacSigns[person.zodiac];
  const ZodiacSymbol = zodiac.symbol;

  return (
    <article className="person-card">
      <div className="person-card__photo">
        <img src={person.photo} alt={person.name} />
      </div>

      <div className="person-card__content">
        <h3 className="person-card__name">{person.name}</h3>

        <div className="person-card__footer">
          <div className="person-card__meta">
            {/* <span className="person-card__zodiac">
              <img src={zodiac.symbol} alt={zodiac.name} />
            </span> */}
            <span className="person-card__zodiac">
              <ZodiacSymbol className="person-card__symbol" />
            </span>

            <span className="person-card__rating">
              Rate | <span>{person.rating}</span>
            </span>
          </div>
        </div>
      </div>

      {/* <BtnArrow className="person-card__arrow" /> */}
      <button
        className="person-card__action"
        aria-label={`مشاهده ${person.name}`}
      >
        <BtnArrow className="person-card__arrow"/>
      </button>
    </article>
  );
}
