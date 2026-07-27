import "./HomeCards.css";
import "../../../assets/styles/home-responsive.css"

import LoginButton from "../../common/LoginButton";
import HomeCard from "../HomeCard/HomeCard";

import { homeCards } from "../../../constants/homeCards";

export default function HomeCards() {
  return (
    <section className="home-cards-section">
      <div className="home-cards-container">
        <div className="home-cards-section__header">
          <LoginButton />
        </div>

        <div className="home-cards">
          {homeCards.map((card) => (
            <HomeCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
