import "./HomeCards.css";

import HomeCard from "../HomeCard";
import { homeCards } from "../../../constants/homeCards";

export default function HomeCards() {
    return (
        <section className="home-cards">
            {homeCards.map((card) => (
                <HomeCard
                    key={card.id}
                    card={card}
                />
            ))}
        </section>
    );
}