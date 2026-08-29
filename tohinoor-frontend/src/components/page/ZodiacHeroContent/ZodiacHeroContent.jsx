import "./ZodiacHeroContent.css";
import "./ZodiacHeroContent-responsive.css";

import { planets } from "../../../constants/planets";

export default function ZodiacHeroContent({ zodiac }) {
  const planet = planets[zodiac.planetKey];

  if (!planet) {
    return null;
  }

  return (
    <div className="zodiac-hero">

      {/* Planet */}
      <div className="zodiac-hero__planet">
        <img
          src={planet.image}
          alt={planet.nameEng}
          className="zodiac-hero__planet-image"
        />
      </div>

      {/* Center */}
      <div className="zodiac-hero__content">
        <h1>
          صورت فلکی {zodiac.name}
        </h1>

        <hr className=""/>

        <div className="zodiac-hero__intro">
            <div className="zodiac-hero__intro--p1">
                <img
                    src={zodiac.icon}
                    alt={planet.nameEng}
                    className="zodiac-hero__intro-icon"
                />
                <span className="zodiac-hero__name">
                    {zodiac.nameEng}
                </span>
            </div>

            <div  className="zodiac-hero__intro--p2">
                <img
                    src={planet.icon}
                    alt={planet.nameEng}
                    className="zodiac-hero__intro-icon"
                />

                <img
                    src={planet.symbol}
                    alt={planet.nameEng}
                    className="zodiac-hero__intro-icon"
                />

                <div className="zodiac-hero__intro--ruler-name">
                    <span className="zodiac-hero__ruler-name-fa">
                        سیاره حاکم
                    </span>
                    <span className="zodiac-hero__ruler-name-eng">
                        {planet.nameEng}
                    </span>

                </div>
            </div>
        </div>

      </div>

      {/* Zodiac */}
      <div className="zodiac-hero__icon">
        <img
          src={zodiac.image}
          alt={zodiac.nameEng}
          className="zodiac-hero__intro-image"
        />
      </div>

    </div>
  );
}