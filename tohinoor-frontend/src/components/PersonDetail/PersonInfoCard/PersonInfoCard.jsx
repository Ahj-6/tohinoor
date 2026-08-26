import "./PersonInfoCard.css";
import "./PersonInfoCard-responsive.css";

import { zodiacSigns } from "../../../constants/zodiacSigns";
import { formatBirthDate } from "../../../utils/formatDate";

import IconPin from "../../../assets/images/icons/pin.svg?react";
import IconCalendar from "../../../assets/images/icons/calendar.svg?react";
import IconGlobe from "../../../assets/images/icons/globe.svg?react";
import IconClock from "../../../assets/images/icons/clock.svg?react";

export default function PersonInfoCard({ person }) {
  const zodiac = zodiacSigns[person.zodiac];
  const ZodiacSymbol = zodiac.symbol;

  return (
    <section className="person-info-card">
      <span className="person-info-card__rating">
        Rate | <span>{person.rating}</span>
      </span>

      <div className="person-info-card__body">
        <div className="person-info-card__photo">
          <img src={person.photo} alt={person.name} />
        </div>

        <div className="person-info-card__text ">
          <h1 className="person-info-card__name-fa mr-2">{person.nameFa}</h1>
          <p className="person-info-card__name-en mr-2">{person.name}</p>

          <div className="person-info-card__zodiac-bar">
            <span>{zodiac.name}</span>
            <ZodiacSymbol className="person-info-card__zodiac-symbol" />
          </div>

          <div className="person-info-card__grid">
            <div className="person-info-card__field">
              <span className="person-info-card__label">
                <IconCalendar className="person-info-card__icon" />
                <b>تاریخ تولد :</b>
              </span>
              <span className="person-info-card__value--date ">
                {formatBirthDate(person.birthDate)}
              </span>
            </div>

            <div className="person-info-card__field">
              <span className="person-info-card__label">
                <IconPin className="person-info-card__icon" />
                <b>مکان تولد :</b>
              </span>
              <span className="person-info-card__value">
                {person.birthPlace.country}، {person.birthPlace.city}
              </span>
              <span className="person-info-card__value person-info-card__value--sub">
                {person.birthPlace.lng} - {person.birthPlace.lat}
              </span>
            </div>

            <div className="person-info-card__field">
              <span className="person-info-card__label">
                <IconClock className="person-info-card__icon" />
                <b>ساعت تولد :</b>
              </span>
              <span className="person-info-card__value">{person.birthTime}</span>
            </div>

            <div className="person-info-card__field">
              <span className="person-info-card__label">
                <IconGlobe className="person-info-card__icon" />
                <b>Timezone :</b>
              </span>
              <span className="person-info-card__value">{person.timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}