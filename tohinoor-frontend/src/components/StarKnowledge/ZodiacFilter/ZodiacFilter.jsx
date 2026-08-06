import "./ZodiacFilter.css";

import ZodiacItem from "../ZodiacItem";
import { zodiacSigns } from "../../../constants/zodiacSigns";

export default function ZodiacFilter() {
  return (
    <section className="zodiac-filter">
      <div className="zodiac-filter__list">
        {Object.values(zodiacSigns).map((zodiac) => (
          <ZodiacItem key={zodiac.id} zodiac={zodiac} />
        ))}
      </div>
    </section>
  );
}
