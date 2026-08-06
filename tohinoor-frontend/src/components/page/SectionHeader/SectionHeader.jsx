import "./SectionHeader.css";

export default function SectionHeader({ title, badge }) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>

      {badge && <span className="section-header__badge">{badge}</span>}
    </div>
  );
}
