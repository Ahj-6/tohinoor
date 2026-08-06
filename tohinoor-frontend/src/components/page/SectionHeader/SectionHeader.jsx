import "./SectionHeader.css";

export default function SectionHeader({ title, subtitle, children }) {
  return (
    <header className="section-header">
      {subtitle && <span className="section-header__subtitle">{subtitle}</span>}

      <h2 className="section-header__title">{title}</h2>

      {children}
    </header>
  );
}
