import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PersonForm from "./PersonForm.jsx";

import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../../../services/peopleService.js";

import { getGenders } from "../../../services/genderService.js";
import { getCountries } from "../../../services/countryService.js";
import { getCities } from "../../../services/cityService.js";
import { getZodiacSigns } from "../../../services/zodiacSignService.js";
import { getBirthAccuracies } from "../../../services/birthAccuracyService.js";
import { getPlanets } from "../../../services/planetService.js";

import "./People.css";

export default function PeopleList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [people, setPeople] = useState([]);

  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [birthAccuracies, setBirthAccuracies] = useState([]);
  const [planets, setPlanets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [loadWarnings, setLoadWarnings] = useState([]);

  const [editingPerson, setEditingPerson] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    setLoadWarnings([]);

    const results = await Promise.allSettled([
      getPeople(),
      getGenders(),
      getCountries(),
      getCities(),
      getZodiacSigns(),
      getBirthAccuracies(),
      getPlanets(),
    ]);

    const [
      peopleResult,
      gendersResult,
      countriesResult,
      citiesResult,
      zodiacSignsResult,
      birthAccuraciesResult,
      planetsResult,
    ] = results;

    // -----------------------------
    // People = اطلاعات اصلی صفحه
    // -----------------------------
    if (peopleResult.status === "rejected") {
      console.error("People API error:", peopleResult.reason);

      setLoadError(
        peopleResult.reason?.response?.data?.message ||
          "دریافت اطلاعات افراد با خطا مواجه شد.",
      );

      setLoading(false);
      return;
    }

    setPeople(peopleResult.value || []);

    // -----------------------------
    // Reference data
    // -----------------------------
    const warnings = [];

    if (planetsResult.status === "fulfilled") {
      setPlanets(planetsResult.value || []);
    } else {
      console.error("Planets API error:", planetsResult.reason);
      setPlanets([]);
      warnings.push("سیاره‌ها");
    }

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

    setLoadWarnings(warnings);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const editPerson = location.state?.editPerson;

    if (!editPerson) {
      return;
    }

    setEditingPerson(editPerson);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [location.state, location.pathname, navigate]);

  const findName = (items, id) => {
    if (!id) {
      return "—";
    }

    return items.find((item) => Number(item.id) === Number(id))?.name || "—";
  };

  const findCode = (items, id) => {
    if (!id) {
      return "—";
    }

    return items.find((item) => Number(item.id) === Number(id))?.code || "—";
  };

  const handleSaved = (savedPerson) => {
    setPeople((current) => {
      const exists = current.some((item) => item.id === savedPerson.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedPerson.id ? savedPerson : item,
        );
      }

      return [...current, savedPerson];
    });

    setEditingPerson(null);
  };

  const handleDelete = async (id) => {
    const person = people.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${person?.name || "این فرد"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deletePerson(id);

      setPeople((current) => current.filter((item) => item.id !== id));

      if (editingPerson?.id === id) {
        setEditingPerson(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف فرد با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const savePerson = async (payload) => {
    if (editingPerson?.id) {
      return updatePerson(editingPerson.id, payload);
    }

    return createPerson(payload);
  };

  const startCreate = () => {
    setEditingPerson({
      id: null,
      name: "",
      name_eng: "",
      image: null,
      gender_id: "",
      birth_date: "",
      birth_time: "",
      country_id: "",
      city_id: "",
      time_zone: "",
      zodiac_sign_id: "",
      birth_accuracy_id: "",
      biography: "",
      wikipedia_url: "",
      status: true,
    });
  };

  return (
    <div className="people-page">
      {/* Page Header */}
      <div className="people-page-header">
        <div className="people-page-title">
          <h1>افراد</h1>

          <div className="people-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            <span>/</span>
            <span>افراد</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingPerson && (
        <div className="people-form-wrapper">
          <PersonForm
            person={editingPerson.id ? editingPerson : null}
            genders={genders}
            countries={countries}
            cities={cities}
            zodiacSigns={zodiacSigns}
            birthAccuracies={birthAccuracies}
            savePerson={savePerson}
            onSaved={handleSaved}
            onCancel={() => setEditingPerson(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="people-card">
        <div className="people-card-header">
          <div className="people-card-title">نمایش افراد</div>

          <button
            type="button"
            className="people-add-button"
            onClick={startCreate}
            disabled={Boolean(editingPerson)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن فرد</span>
          </button>
        </div>

        <div className="people-card-body">
          {loadWarnings.length > 0 && !loading && (
            <div className="alert alert-warning m-3">
              <div className="d-flex align-items-start gap-2">
                <i className="bi bi-exclamation-triangle" />

                <div>
                  <strong>بخشی از اطلاعات مرجع در دسترس نیست.</strong>

                  <div className="mt-1">
                    موارد زیر با خطا دریافت شدند: {loadWarnings.join("، ")}
                  </div>

                  <div className="mt-1">لیست افراد همچنان قابل نمایش است.</div>
                </div>
              </div>
            </div>
          )}
          {loading ? (
            <div className="people-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="people-error">
              <span>{loadError}</span>
              <button type="button" onClick={loadData}>
                تلاش مجدد
              </button>
            </div>
          ) : people.length === 0 ? (
            <div className="people-state">
              <i className="bi bi-inbox" />
              <span>هنوز فردی ثبت نشده است.</span>
            </div>
          ) : (
            <div className="people-table-wrapper">
              <table className="people-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>
                    <th className="col-image">تصویر</th>
                    <th>نام</th>
                    <th className="col-status">وضعیت</th>
                    <th>طالع</th>
                    <th>سیاره حکمران</th>
                    <th className="col-birth">دقت اطلاعات</th>
                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {people.map((person, index) => {
                    const zodiac = zodiacSigns.find(
                      (item) => Number(item.id) === Number(person.zodiac_sign_id)
                    );

                    const rulerPlanetName = zodiac?.ruler_planet_id
                      ? findName(planets, zodiac.ruler_planet_id)
                      : zodiac?.planet_id
                      ? findName(planets, zodiac.planet_id)
                      : "—";

                    return (
                      <tr key={person.id}>
                        {/* ID */}
                        <td className="text-center">{index + 1}</td>

                        {/* IMAGE */}
                        <td className="person-image-cell">
                          {person.image_url ? (
                            <img
                              src={person.image_url}
                              alt={person.name}
                              className="person-list-image"
                            />
                          ) : (
                            <div className="person-list-image person-list-image--empty">
                              <i className="bi bi-person" />
                            </div>
                          )}
                        </td>

                        {/* NAME */}
                        <td className="person-name">{person.name}</td>

                        {/* STATUS */}
                        <td className="text-center">
                          {person.status ? (
                            <span className="person-status person-status--active">
                              فعال
                            </span>
                          ) : (
                            <span className="person-status person-status--inactive">
                              غیرفعال
                            </span>
                          )}
                        </td>

                        {/* ZODIAC SIGN */}
                        <td>
                          {findName(zodiacSigns, person.zodiac_sign_id)}
                        </td>

                        {/* RULER PLANET */}
                        <td>{rulerPlanetName}</td>

                        {/* BIRTH ACCURACY CODE */}
                        <td className="text-center">
                          {findCode(birthAccuracies, person.birth_accuracy_id)}
                        </td>

                        {/* ACTIONS */}
                        <td>
                          <div className="person-actions">
                            <Link
                              // to={`/admin/people/${person.id}`}
                              to={`/admin/people/${person.slug}`}
                              className="person-view-button"
                            >
                              <i className="bi bi-eye" />
                              <span>نمایش</span>
                            </Link>

                            <button
                              type="button"
                              className="person-delete-button"
                              onClick={() => handleDelete(person.id)}
                              disabled={deletingId === person.id}
                            >
                              {deletingId === person.id ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  aria-hidden="true"
                                />
                              ) : (
                                <>
                                  <i className="bi bi-trash" />
                                  <span>حذف</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}