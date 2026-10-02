import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// import { getPerson } from "../../../services/peopleService.js";
import { getAdminPersonBySlug } from "../../../services/adminPeopleService.js";
import { getGenders } from "../../../services/genderService.js";
import { getCountries } from "../../../services/countryService.js";
import { getCities } from "../../../services/cityService.js";
import { getZodiacSigns } from "../../../services/zodiacSignService.js";
import { getBirthAccuracies } from "../../../services/birthAccuracyService.js";
import { getChartTypes } from "../../../services/chartTypeService.js";
import { getPersonCharts } from "../../../services/chartService.js";

import "./PersonDetails.css";

export default function PersonDetails() {
  const { personSlug } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [birthAccuracies, setBirthAccuracies] = useState([]);
  const [chartTypes, setChartTypes] = useState([]);
  const [charts, setCharts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [loadWarnings, setLoadWarnings] = useState([]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    setLoadWarnings([]);

    const results = await Promise.allSettled([
      getAdminPersonBySlug(personSlug),
      getGenders(),
      getCountries(),
      getCities(),
      getZodiacSigns(),
      getBirthAccuracies(),
      getChartTypes(),
    ]);

    const [
      personResult,
      gendersResult,
      countriesResult,
      citiesResult,
      zodiacSignsResult,
      birthAccuraciesResult,
      chartTypesResult,
    ] = results;

    // --------------------------------
    // فرد = اطلاعات اصلی صفحه
    // --------------------------------

    if (personResult.status === "rejected") {
      console.error("Person API error:", personResult.reason);

      setPerson(null);

      setError(
        personResult.reason?.response?.data?.message ||
          "دریافت اطلاعات فرد با خطا مواجه شد.",
      );

      setCharts([]);
      setLoading(false);
      return;
    }

    const personData = personResult.value;

    setPerson(personData);

    // --------------------------------
    // اطلاعات مرجع
    // --------------------------------

    const warnings = [];

    if (gendersResult.status === "fulfilled") {
      setGenders(gendersResult.value || []);
    } else {
      console.error("Genders API error:", gendersResult.reason);

      setGenders([]);
      warnings.push("جنسیت‌ها");
    }

    if (countriesResult.status === "fulfilled") {
      setCountries(countriesResult.value || []);
    } else {
      console.error("Countries API error:", countriesResult.reason);

      setCountries([]);
      warnings.push("کشورها");
    }

    if (citiesResult.status === "fulfilled") {
      setCities(citiesResult.value || []);
    } else {
      console.error("Cities API error:", citiesResult.reason);

      setCities([]);
      warnings.push("شهرها");
    }

    if (zodiacSignsResult.status === "fulfilled") {
      setZodiacSigns(zodiacSignsResult.value || []);
    } else {
      console.error("Zodiac Signs API error:", zodiacSignsResult.reason);

      setZodiacSigns([]);
      warnings.push("نشانه‌های زودیاک");
    }

    if (birthAccuraciesResult.status === "fulfilled") {
      setBirthAccuracies(birthAccuraciesResult.value || []);
    } else {
      console.error(
        "Birth Accuracies API error:",
        birthAccuraciesResult.reason,
      );

      setBirthAccuracies([]);
      warnings.push("دقت اطلاعات تولد");
    }

    if (chartTypesResult.status === "fulfilled") {
      setChartTypes(chartTypesResult.value || []);
    } else {
      console.error("Chart Types API error:", chartTypesResult.reason);

      setChartTypes([]);
      warnings.push("انواع چارت");
    }

    // --------------------------------
    // چارت‌های فرد
    // --------------------------------

    try {
      const personCharts = await getPersonCharts(personData.id);

      setCharts(personCharts || []);
    } catch (error) {
      console.error("Charts API error:", error);

      setCharts([]);
      warnings.push("چارت‌های فرد");
    }

    setLoadWarnings(warnings);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [personSlug]);

  const findName = (items, id) => {
    if (!id) {
      return "—";
    }

    return (
      items.find((item) => Number(item.id) === Number(id))?.name_eng || "—"
    );
  };

  const genderName = useMemo(
    () => findName(genders, person?.gender_id),
    [genders, person],
  );

  const countryName = useMemo(
    () => findName(countries, person?.country_id),
    [countries, person],
  );

  const cityName = useMemo(
    () => findName(cities, person?.city_id),
    [cities, person],
  );

  const zodiacSign = useMemo(
    () =>
      zodiacSigns.find(
        (item) => Number(item.id) === Number(person?.zodiac_sign_id),
      ),
    [zodiacSigns, person],
  );

  const birthAccuracy = useMemo(
    () =>
      birthAccuracies.find(
        (item) => Number(item.id) === Number(person?.birth_accuracy_id),
      ),
    [birthAccuracies, person],
  );

  const chartTypeMap = useMemo(
    () => new Map(chartTypes.map((item) => [Number(item.id), item])),
    [chartTypes],
  );

  const formatBirthDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = String(value).substring(0, 10);

    if (date.length !== 10) {
      return date;
    }

    const [year, month, day] = date.split("-");

    return `${year} / ${month} / ${day}`;
  };

  const formatBirthTime = (value) => {
    if (!value) {
      return "—";
    }

    return String(value).substring(0, 8);
  };

  const handleEdit = () => {
    navigate(`/admin/people/${person.slug}/edit`);
  };

  if (loading) {
    return (
      <div className="person-details-page">
        <div className="person-details-state">
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          />
          <span>در حال دریافت اطلاعات فرد...</span>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="person-details-page">
        <div className="alert alert-danger">
          {error || "فرد مورد نظر پیدا نشد."}
        </div>

        <Link to="/admin/people" className="btn btn-secondary">
          <i className="bi bi-arrow-right me-1" />
          بازگشت به لیست افراد
        </Link>
      </div>
    );
  }

  return (
    <div className="person-details-page">
      {/* Header */}
      <div className="person-details-header">
        <div>
          <div className="person-details-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            <span>/</span>
            <Link to="/admin/people">افراد</Link>
            <span>/</span>
            <span>نمایش جزئیات فرد</span>
          </div>

          <h1>نمایش جزئیات فرد</h1>
        </div>

        {/* <Link to="/admin/people" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-right me-1" />
          بازگشت به لیست
        </Link> */}
      </div>

      {loadWarnings.length > 0 && (
        <div className="alert alert-warning person-details-warning mb-2">
          <div className="d-flex align-items-start gap-2">
            <i className="bi bi-exclamation-triangle" />

            <div>
              <strong>بخشی از اطلاعات فرد در دسترس نیست.</strong>

              <div className="mt-1">
                موارد زیر با خطا دریافت شدند: {loadWarnings.join("، ")}
              </div>

              <div className="mt-1">
                سایر اطلاعات فرد همچنان قابل نمایش است.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Identity */}
      <section className="person-details-card person-details-hero">
        <div className="person-details-hero__image">
          {person.image_url ? (
            <img src={person.image_url} alt={person.name} />
          ) : (
            <div className="person-details-hero__no-image">
              <i className="bi bi-person" />
            </div>
          )}
        </div>

        <div className="person-details-hero__content">
          <div className="person-details-status">
            {person.status ? (
              <span className="person-status person-status--active">فعال</span>
            ) : (
              <span className="person-status person-status--inactive">
                غیرفعال
              </span>
            )}
          </div>

          <h2>{person.name}</h2>

          <div className="person-details-name-eng">{person.name_eng}</div>

          <div className="person-details-quick-info">
            <div>
              <span>جنسیت</span>
              <strong>{genderName}</strong>
            </div>

            <div>
              <span>طالع</span>
              <strong>{zodiacSign?.name_eng || "—"}</strong>
            </div>

            <div>
              <span>دقت اطلاعات تولد</span>
              <strong>{birthAccuracy?.code || "—"}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Birth Information */}
      <section className="person-details-card">
        <div className="person-details-section-title">
          <i className="bi bi-calendar3" />
          <h2>اطلاعات تولد</h2>
        </div>

        <div className="person-details-grid">
          <div className="person-info-item">
            <span>تاریخ تولد</span>
            <strong>{formatBirthDate(person.birth_date)}</strong>
          </div>

          <div className="person-info-item">
            <span>ساعت تولد</span>
            <strong dir="ltr">{formatBirthTime(person.birth_time)}</strong>
          </div>

          <div className="person-info-item">
            <span>کشور تولد</span>
            <strong>{countryName}</strong>
          </div>

          <div className="person-info-item">
            <span>شهر تولد</span>
            <strong>{cityName}</strong>
          </div>

          <div className="person-info-item">
            <span>منطقه زمانی</span>
            <strong dir="ltr">{person.time_zone || "—"}</strong>
          </div>

          {/* <div className="person-info-item">
            <span>دقت اطلاعات تولد</span>
            <strong>{birthAccuracy?.name || "—"}</strong>

            {birthAccuracy?.code && <small>{birthAccuracy.code}</small>}
          </div> */}
        </div>
      </section>

      {/* Astrology */}
      {/* <section className="person-details-card person-details-card--astrology">
        <div className="person-details-section-title">
          <i className="bi bi-stars" />
          <h2>اطلاعات استرولوژی</h2>
        </div>

        <div className="person-details-grid">
          <div className="person-info-item">
            <span>طالع</span>
            <strong>{zodiacSign?.name_eng || "—"}</strong>

            {zodiacSign?.name_eng && (
              <small dir="ltr">{zodiacSign.name}</small>
            )}
          </div>

          <div className="person-info-item">
            <span>نام عربی نشانه</span>
            <strong>{zodiacSign?.name_arabic || "—"}</strong>
          </div>

          <div className="person-info-item">
            <span>نام سانسکریت نشانه</span>
            <strong>{zodiacSign?.name_sanskrit || "—"}</strong>
          </div>

          <div className="person-info-item">
            <span>نماد نشانه</span>
            <strong>{zodiacSign?.symbol || "—"}</strong>
          </div>
        </div>
      </section> */}

      {/* Biography */}
      <section className="person-details-card">
        <div className="person-details-section-title">
          <i className="bi bi-card-text" />
          <h2>زندگی‌نامه و اطلاعات تکمیلی</h2>
        </div>

        <div className="person-details-biography">
          {person.biography ? (
            <p>{person.biography}</p>
          ) : (
            <span className="person-details-muted">
              زندگی‌نامه‌ای ثبت نشده است.
            </span>
          )}
        </div>

        <div className="person-details-link-row">
          <span>ویکی‌پدیا</span>

          {person.wikipedia_url ? (
            <a
              href={person.wikipedia_url}
              target="_blank"
              rel="noreferrer"
              dir="ltr"
            >
              {person.wikipedia_url}
              <i className="bi bi-box-arrow-up-left" />
            </a>
          ) : (
            <span className="person-details-muted">ثبت نشده است</span>
          )}
        </div>
      </section>

      {/* Charts */}
      <section className="person-details-card">
        <div className="person-details-section-header">
          <div className="person-details-section-title">
            <i className="bi bi-bar-chart-line" />
            <h2>چارت‌های فرد</h2>
          </div>

          <Link
            to={`/admin/people/${person.slug}/charts`}
            className="btn btn-primary"
          >
            <i className="bi bi-plus-lg me-1" />
            {charts.length === 0 ? "افزودن چارت" : "مدیریت چارت‌ها"}
          </Link>
        </div>

        {charts.length === 0 ? (
          <div className="person-details-empty">
            <div className="person-details-empty__icon">
              <i className="bi bi-bar-chart" />
            </div>

            <h3>هنوز چارتی برای این فرد ثبت نشده است.</h3>

            <p>برای این فرد می‌توانید تصویر یک یا چند نوع چارت را ثبت کنید.</p>

            <Link
              to={`/admin/people/${person.slug}/charts`}
              className="btn btn-primary"
            >
              <i className="bi bi-plus-lg me-1" />
              افزودن چارت
            </Link>
          </div>
        ) : (
          <div className="person-details-charts-grid">
            {charts.map((chart) => {
              const chartType = chartTypeMap.get(Number(chart.chart_type_id));

              return (
                <div className="person-detail-chart" key={chart.id}>
                  <div className="person-detail-chart__image">
                    {chart.image_url ? (
                      <img
                        src={chart.image_url}
                        alt={chartType?.name || "تصویر چارت"}
                      />
                    ) : (
                      <div className="person-detail-chart__no-image">
                        <i className="bi bi-image" />
                      </div>
                    )}
                  </div>

                  <div className="person-detail-chart__body">
                    <h3>{chartType?.name || "نوع چارت نامشخص"}</h3>

                    {chartType?.name_eng && (
                      <small dir="ltr">{chartType.name_eng}</small>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer Actions */}
      <div className="person-details-footer">
        <button type="button" className="btn btn-warning" onClick={handleEdit}>
          <i className="bi bi-pencil me-1" />
          ویرایش فرد
        </button>

        <Link to="/admin/people" className="btn btn-secondary">
          <i className="bi bi-arrow-right me-1" />
          بازگشت به لیست افراد
        </Link>
      </div>
    </div>
  );
}
