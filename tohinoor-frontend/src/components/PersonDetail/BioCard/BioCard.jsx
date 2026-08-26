import "./BioCard.css";

export default function BioCard({ title = "بایوگرافی", paragraphs = [] }) {
  return (
    <section className="bio-card">
      <h2 className="bio-card__title">{title}</h2>

      <div className="bio-card__body">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}