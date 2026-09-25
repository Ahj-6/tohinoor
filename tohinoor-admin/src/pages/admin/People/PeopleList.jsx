import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

import "./People.css";

export default function PeopleList() {
  const [people, setPeople] = useState([]);

  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [birthAccuracies, setBirthAccuracies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingPerson, setEditingPerson] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const [
        peopleData,
        gendersData,
        countriesData,
        citiesData,
        zodiacSignsData,
        birthAccuraciesData,
      ] = await Promise.all([
        getPeople(),
        getGenders(),
        getCountries(),
        getCities(),
        getZodiacSigns(),
        getBirthAccuracies(),
      ]);

      setPeople(peopleData);
      setGenders(gendersData);
      setCountries(countriesData);
      setCities(citiesData);
      setZodiacSigns(zodiacSignsData);
      setBirthAccuracies(birthAccuraciesData);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات افراد با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const findName = (items, id) => {
    if (!id) {
      return "—";
    }

    return items.find((item) => Number(item.id) === Number(id))?.name || "—";
  };

  const formatBirthDate = (value) => {
    if (!value) {
      return "—";
    }

    return String(value).substring(0, 10);
  };

  const formatBirthTime = (value) => {
    if (!value) {
      return "—";
    }

    return String(value).substring(0, 8);
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
      image: "",
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
            <a href="/admin">داشبورد</a>

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

                    <th>نام</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th>جنسیت</th>

                    {/* <th>کشور</th> */}

                    {/* <th>شهر</th> */}

                    <th className="col-birth">تاریخ تولد</th>

                    <th className="col-status">وضعیت</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {people.map((person, index) => (
                    <tr key={person.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="person-name">{person.name}</td>

                      <td className="person-name-eng" dir="ltr">
                        {person.name_eng}
                      </td>

                      <td>{findName(genders, person.gender_id)}</td>

                      {/* <td>{findName(countries, person.country_id)}</td> */}

                      {/* <td>{findName(cities, person.city_id)}</td> */}

                      <td
                        // dir="ltr"
                        className="person-birth"
                      >
                        <div>{formatBirthDate(person.birth_date)}</div>

                        {person.birth_time && (
                          <small>{formatBirthTime(person.birth_time)}</small>
                        )}
                      </td>

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

                      <td>
                        <div className="person-actions">
                          <Link
                            to={`/admin/people/${person.id}/charts`}
                            className="person-chart-button"
                          >
                            <i className="bi bi-bar-chart-line" />

                            <span>چارت‌ها</span>
                          </Link>

                          <button
                            type="button"
                            className="person-edit-button"
                            onClick={() => setEditingPerson(person)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />

                            <span>ویرایش</span>
                          </button>

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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
