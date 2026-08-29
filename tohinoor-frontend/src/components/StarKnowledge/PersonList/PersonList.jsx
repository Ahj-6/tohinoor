import "./PersonList.css";
import "./PersonList-responsive.css";

import PersonCard from "../PersonCard";
import SectionHeader from "../../page/SectionHeader";

export default function PersonList({
  people,
  title = "همه زایچه‌ها",
}) {
  return (
    <section className="person-list">
      <SectionHeader
        title={title}
        badge={`${people.length} نفر`}
      />

      {people.length > 0 ? (
        <div className="person-list__grid">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
            />
          ))}
        </div>
      ) : (
        <p className="person-list__empty">
          موردی مطابق عبارت جستجو پیدا نشد.
        </p>
      )}
    </section>
  );
}