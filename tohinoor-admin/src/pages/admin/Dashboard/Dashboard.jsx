import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getSitePageViewStats,
} from "../../../services/dashboardService.js";

import "./Dashboard.css";

export default function Dashboard() {
  // آمار اصلی داشبورد
  const [stats, setStats] = useState({
    astrology_tables: 11,
    people: null,
    books: null,
    movies: null,
    sample_analyses: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // آمار بازدید سایت
  const [siteStats, setSiteStats] = useState({
    today: {
      page_views: 0,
      unique_visitors: 0,
    },
    all_time: {
      page_views: 0,
      unique_visitors: 0,
    },
    last_7_days: [],
    top_pages_30_days: [],
    top_pages_all_time: [],
  });

  const [siteStatsLoading, setSiteStatsLoading] = useState(true);
  const [siteStatsError, setSiteStatsError] = useState("");

  // دریافت آمار اصلی داشبورد
  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardStats();

        if (!active) return;

        setStats({
          astrology_tables: data?.astrology_tables ?? 11,
          people: data?.people ?? 0,
          books: data?.books ?? 0,
          movies: data?.movies ?? 0,
          sample_analyses: data?.sample_analyses ?? 0,
        });
      } catch (requestError) {
        console.error("Dashboard stats error:", requestError);

        if (active) {
          setError(
            requestError?.response?.data?.message ||
              "دریافت آمار داشبورد با خطا مواجه شد."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  // دریافت آمار بازدید سایت
  useEffect(() => {
    let active = true;

    const loadSiteStats = async () => {
      try {
        setSiteStatsLoading(true);
        setSiteStatsError("");

        const data = await getSitePageViewStats();

        if (!active) return;

        setSiteStats({
          today: {
            page_views: data?.today?.page_views ?? 0,
            unique_visitors: data?.today?.unique_visitors ?? 0,
          },
          all_time: {
            page_views: data?.all_time?.page_views ?? 0,
            unique_visitors: data?.all_time?.unique_visitors ?? 0,
          },
          last_7_days: data?.last_7_days ?? [],
          top_pages_30_days: data?.top_pages_30_days ?? [],
          top_pages_all_time: data?.top_pages_all_time ?? [],
        });
      } catch (requestError) {
        console.error("Site page view stats error:", requestError);

        if (active) {
          setSiteStatsError(
            requestError?.response?.data?.message ||
              "دریافت آمار بازدید سایت با خطا مواجه شد."
          );
        }
      } finally {
        if (active) {
          setSiteStatsLoading(false);
        }
      }
    };

    loadSiteStats();

    return () => {
      active = false;
    };
  }, []);

  // قالب‌بندی اعداد
  const formatValue = (value) => {
    if (loading && value === null) {
      return "—";
    }

    return Number(value ?? 0).toLocaleString("fa-IR");
  };

  // کارت‌های اصلی داشبورد
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

  // آماده‌سازی اطلاعات نمودار
  const days = siteStats.last_7_days;

  const maxViews = Math.max(
    1,
    ...days.map((day) => Number(day.page_views) || 0)
  );

  return (
    <>
      {/* عنوان صفحه */}
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="m-0">داشبورد</h1>
        </div>
      </div>

      {/* خطای آمار اصلی */}
      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}

      {/* کارت‌های اصلی داشبورد */}
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

      {/* آمار بازدید سایت */}
      <section className="site-analytics mt-4">
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="h4 m-0">آمار بازدید سایت</h2>
          </div>
        </div>

        {/* خطای آمار بازدید */}
        {siteStatsError && (
          <div className="alert alert-danger mb-3">
            {siteStatsError}
          </div>
        )}

        {siteStatsLoading ? (
          <div className="text-muted py-3">
            در حال دریافت آمار بازدید...
          </div>
        ) : !siteStatsError ? (
          <>
            {/* چهار کارت آمار بازدید */}
            <div className="row g-3 mb-4">
              {/* بازدید صفحات امروز */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card site-analytics__metric h-100">
                  <div className="card-body">
                    <div className="site-analytics__label">
                      بازدید صفحات امروز
                    </div>

                    <div className="site-analytics__value">
                      {formatValue(siteStats.today.page_views)}
                    </div>

                    <i className="bi bi-eye site-analytics__icon" />
                  </div>
                </div>
              </div>

              {/* بازدیدکنندگان یکتای امروز */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card site-analytics__metric h-100">
                  <div className="card-body">
                    <div className="site-analytics__label">
                      بازدیدکنندگان امروز
                    </div>

                    <div className="site-analytics__value">
                      {formatValue(siteStats.today.unique_visitors)}
                    </div>

                    <i className="bi bi-people site-analytics__icon" />
                  </div>
                </div>
              </div>

              {/* کل بازدیدکنندگان یکتا */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card site-analytics__metric h-100">
                  <div className="card-body">
                    <div className="site-analytics__label">
                      کل بازدیدکنندگان
                    </div>

                    <div className="site-analytics__value">
                      {formatValue(siteStats.all_time.unique_visitors)}
                    </div>

                    <i className="bi bi-people-fill site-analytics__icon" />
                  </div>
                </div>
              </div>

              {/* کل بازدید صفحات */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card site-analytics__metric h-100">
                  <div className="card-body">
                    <div className="site-analytics__label">
                      کل بازدید صفحات
                    </div>

                    <div className="site-analytics__value">
                      {formatValue(siteStats.all_time.page_views)}
                    </div>

                    <i className="bi bi-eye-fill site-analytics__icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* نمودار بازدید هفت روز اخیر */}
            <div className="card site-analytics__panel mb-4">
              <div className="card-header">
                <h3 className="card-title">
                  بازدید هفت روز اخیر
                </h3>
              </div>

              <div className="card-body">
                {days.length > 0 ? (
                  <div className="site-analytics__chart">
                    {days.map((day) => {
                      const views = Number(day.unique_visitors) || 0;

                      const barHeight =
                        views > 0
                          ? `${Math.max(
                              (views / maxViews) * 100,
                              4
                            )}%`
                          : "0%";

                      const displayDate = new Date(
                        `${day.date}T12:00:00`
                      ).toLocaleDateString("fa-IR", {
                        weekday: "short",
                        day: "numeric",
                      });

                      return (
                        <div
                          className="site-analytics__day"
                          key={day.date}
                        >
                          <div className="site-analytics__count">
                            {formatValue(views)}
                            {/* ********************************** */}
                          </div>

                          <div className="site-analytics__bar-track">
                            <div
                              className="site-analytics__bar"
                              style={{ height: barHeight }}
                              title={`${views} بازدید`}
                            />
                          </div>

                          <div className="site-analytics__date">
                            {displayDate}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted mb-0">
                    اطلاعاتی برای نمایش وجود ندارد.
                  </p>
                )}
              </div>
            </div>

            {/* ده صفحه پربازدید از ابتدای ثبت آمار */}
            <div className="card site-analytics__panel">
              <div className="card-header">
                <h3 className="card-title">
                  ۱۰ صفحه پربازدید از ابتدای ثبت آمار
                </h3>
              </div>

              <div className="card-body p-0">
                {siteStats.top_pages_all_time.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>مسیر صفحه</th>
                          <th className="text-end">
                            تعداد بازدید
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {siteStats.top_pages_all_time.map((page) => (
                          <tr key={page.path}>
                            <td>
                              <code
                                className="site-analytics__path"
                                dir="ltr"
                              >
                                {page.path}
                              </code>
                            </td>

                            <td className="text-end">
                              {formatValue(page.views)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted p-3 mb-0">
                    هنوز بازدیدی برای این بازه ثبت نشده است.
                  </p>
                )}
              </div>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
