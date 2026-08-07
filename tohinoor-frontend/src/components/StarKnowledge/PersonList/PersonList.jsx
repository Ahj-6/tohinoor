import "./PersonList.css";
import "./PersonList-responsive.css";

import PersonCard from "../PersonCard";
import SectionHeader from "../../page/SectionHeader";

export default function PersonList({ people }) {
  return (
    <section className="person-list">
      <SectionHeader title="همه زایچه‌ها" badge={`${people.length} نفر`} />

      <div className="person-list__grid">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}
