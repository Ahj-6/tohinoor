import "./PersonList.css";
import "./PersonList-responsive.css";

import { FaArrowRight } from "react-icons/fa";

import PersonCard from "../PersonCard";
import SectionHeader from "../../page/SectionHeader";

export default function PersonList({
  people,
  title = "همه زایچه‌ها",
  filterActive = false,
  onClearFilter,
}) {
  return (
    <section className="person-list">
      <SectionHeader
        title={title}
        badge={`${people.length} نفر`}
        showClear={filterActive}
        onClear={onClearFilter}
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

      {filterActive && (
        <div className="person-list__back-wrapper">
          <button
            type="button"
            className="person-list__back-button"
            onClick={onClearFilter}
          >
            <FaArrowRight />
            <span>بازگشت به همه زایچه‌ها</span>
          </button>
        </div>
      )}
    </section>
  );
}