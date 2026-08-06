import "./PersonList.css";

import PersonCard from "../PersonCard";
import { people } from "../../../data/people";

export default function PersonList() {
  return (
    <section className="person-list">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </section>
  );
}
