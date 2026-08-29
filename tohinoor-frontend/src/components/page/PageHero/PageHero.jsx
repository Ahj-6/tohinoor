import "./PageHero.css";
import "./PageHero-responsive.css";

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  children,
  variant = "default",
}) {
  return (
    <section
      className={`page-hero page-hero--${variant}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="page-hero__overlay">
        <div className="page-hero__content">
          {title && <h1>{title}</h1>}

          {subtitle && <p>{subtitle}</p>}

          {children}
        </div>
      </div>
    </section>
  );
}