import { Link } from "react-router-dom";
import "./Astrology.css";

const astrologyItems = [
  {
    title: "عناصر",
    description: "مدیریت عناصر مورد استفاده در سیستم",
    icon: "bi-circle-half",
    path: "/admin/elements",
  },
  {
    title: "طبیعت‌ها",
    description: "مدیریت انواع طبیعت سیارات",
    icon: "bi-leaf",
    path: "/admin/natures",
  },
  {
    title: "گوناها",
    description: "مدیریت انواع گونا",
    icon: "bi-grid-3x3-gap",
    path: "/admin/gunas",
  },
  {
    title: "کیفیت‌ها",
    description: "مدیریت کیفیت‌های زودیاک",
    icon: "bi-stars",
    path: "/admin/qualities",
  },
  {
    title: "سیارات",
    description: "مدیریت سیارات و ویژگی‌های آن‌ها",
    icon: "bi-globe2",
    path: "/admin/planets",
  },
  {
    title: "نشانه‌های زودیاک",
    description: "مدیریت نشانه‌های دوازده‌گانه",
    icon: "bi-moon-stars",
    path: "/admin/zodiac-signs",
  },
  {
    title: "انواع چارت",
    description: "مدیریت انواع نمودارهای نجومی",
    icon: "bi-bar-chart",
    path: "/admin/chart-types",
  },
];

const birthItems = [
  {
    title: "کشورها",
    description: "مدیریت کشورهای محل تولد",
    icon: "bi-globe",
    path: "/admin/countries",
  },
  {
    title: "شهرها",
    description: "مدیریت شهرها و اطلاعات جغرافیایی",
    icon: "bi-buildings",
    path: "/admin/cities",
  },
  {
    title: "دقت تولد",
    description: "مدیریت سطوح اعتبار اطلاعات تولد",
    icon: "bi-patch-check",
    path: "/admin/birth-accuracies",
  },
  {
    title: "جنسیت‌ها",
    description: "مدیریت انواع جنسیت",
    icon: "bi-person",
    path: "/admin/genders",
  },
];

function ManagementCard({ item, variant }) {
  return (
    <Link
      to={item.path}
      className={`astrology-card astrology-card--${variant} text-decoration-none`}
    >
      <div className="astrology-card__icon">
        <i className={`bi ${item.icon}`} />
      </div>

      <div className="astrology-card__content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div className="astrology-card__arrow">
        <i className="bi bi-chevron-left" />
      </div>
    </Link>
  );
}

function Section({ title, icon, items, variant }) {
  return (
    <section className={`astrology-section astrology-section--${variant}`}>
      <div className="astrology-section__header">
        <h2>
          <i className={`bi ${icon}`} />
          <span>{title}</span>
        </h2>
      </div>

      <div className="row g-3">
        {items.map((item) => (
          <div key={item.title} className="col-12 col-md-6 col-xl-4">
            <ManagementCard item={item} variant={variant} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default function Astrology() {
  return (
    <div className="astrology-page">
      {/* Page Header */}
      <div className="astrology-page-header">
        <h1>استرولوژی</h1>

        <div className="astrology-breadcrumb">
          <Link to="/admin">داشبورد</Link>

          <span>/</span>

          <span>استرولوژی</span>
        </div>
      </div>

      {/* Astrology References */}
      <Section
        title="مبانی استرولوژی"
        icon="bi-stars"
        items={astrologyItems}
        variant="astrology"
      />

      {/* Birth References */}
      <Section
        title="اطلاعات تولد"
        icon="bi-person-vcard"
        items={birthItems}
        variant="birth"
      />
    </div>
  );
}
