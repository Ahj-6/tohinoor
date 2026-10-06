import { useEffect, useState } from "react";

import { getDashboardStats } from "../../../services/dashboardService.js";

import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    astrology_tables: 11,
    people: null,
    books: null,
    movies: null,
    sample_analyses: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardStats();

        setStats({
          astrology_tables: data?.astrology_tables ?? 11,
          people: data?.people ?? 0,
          books: data?.books ?? 0,
          movies: data?.movies ?? 0,
          sample_analyses: data?.sample_analyses ?? 0,
        });
      } catch (requestError) {
        console.error("Dashboard stats error:", requestError);

        setError(
          requestError?.response?.data?.message ||
            "دریافت آمار داشبورد با خطا مواجه شد.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const formatValue = (value) => {
    if (loading && value === null) {
      return "—";
    }

    return Number(value ?? 0).toLocaleString("fa-IR");
  };

  const cards = [
    {
      label: "استرولوژی",
      value: stats.astrology_tables,
      icon: "bi-stars",
      className: "text-bg-secondary",
      gridClass: "col-12 col-sm-6 col-xl-3",
    },
    {
      label: "افراد",
      value: stats.people,
      icon: "bi-people",
      className: "text-bg-success",
      gridClass: "col-12 col-sm-6 col-xl-3",
    },
    {
      label: "کتاب‌ها",
      value: stats.books,
      icon: "bi-book",
      className: "text-bg-warning",
      gridClass: "col-12 col-sm-6 col-xl-3",
    },
    {
      label: "فیلم‌ها",
      value: stats.movies,
      icon: "bi-film",
      className: "text-bg-danger",
      gridClass: "col-12 col-sm-6 col-xl-3",
    },
    {
      label: "نمونه کار اعضا",
      value: stats.sample_analyses,
      icon: "bi-journal-richtext",
      className: "text-bg-primary",
      gridClass: "col-12",
    },
  ];

  return (
    <>
      {/* Page Title */}
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="m-0">داشبورد</h1>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="row g-3 dashboard-stats">
        {cards.map((card) => (
          <div
            className={card.gridClass}
            key={card.label}
          >
            <div
              className={`small-box dashboard-box ${card.className}`}
            >
              <div className="inner">
                <h3>{formatValue(card.value)}</h3>
                <p>{card.label}</p>
              </div>

              <div className="icon">
                <i className={`bi ${card.icon}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}