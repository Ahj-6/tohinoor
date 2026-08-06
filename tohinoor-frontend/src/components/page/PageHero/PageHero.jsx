import "./PageHero.css";

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  children,
}) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="page-hero__overlay">
        <div className="page-hero__content">
          <h1>{title}</h1>

          {subtitle && <p>{subtitle}</p>}

          {children}
        </div>
      </div>
    </section>
  );
}
