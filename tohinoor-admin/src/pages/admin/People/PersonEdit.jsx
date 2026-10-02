import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PersonForm from "./PersonForm.jsx";

import {
  getAdminPersonBySlug,
  updateAdminPerson,
} from "../../../services/adminPeopleService.js";

import { getGenders } from "../../../services/genderService.js";
import { getCountries } from "../../../services/countryService.js";
import { getCities } from "../../../services/cityService.js";
import { getZodiacSigns } from "../../../services/zodiacSignService.js";
import { getBirthAccuracies } from "../../../services/birthAccuracyService.js";

import "./People.css";

export default function PersonEdit() {
  const { personSlug } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);

  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [birthAccuracies, setBirthAccuracies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.all([
          getAdminPersonBySlug(personSlug),
          getGenders(),
          getCountries(),
          getCities(),
          getZodiacSigns(),
          getBirthAccuracies(),
        ]);

        setPerson(results[0]);
        setGenders(results[1] || []);
        setCountries(results[2] || []);
        setCities(results[3] || []);
        setZodiacSigns(results[4] || []);
        setBirthAccuracies(results[5] || []);
      } catch (err) {
        console.error("Person edit load error:", err);

        setError(
          err?.response?.data?.message || "دریافت اطلاعات فرد با خطا مواجه شد.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [personSlug]);

  const savePerson = async (payload) => {
    return updateAdminPerson(person.id, payload);
  };

  const handleSaved = (savedPerson) => {
    navigate(`/admin/people/${savedPerson?.slug || person.slug}`, {
      replace: true,
    });
  };

  const handleCancel = () => {
    navigate(`/admin/people/${person.slug}`, { replace: true });
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

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/admin/people")}
        >
          <i className="bi bi-arrow-right me-1" />
          بازگشت به لیست افراد
        </button>
      </div>
    );
  }

  return (
    <div className="person-details-page">
      <div className="person-details-header">
        <div>
          <div className="person-details-breadcrumb">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/admin")}
            >
              داشبورد
            </button>

            <span>/</span>

            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/admin/people")}
            >
              افراد
            </button>

            <span>/</span>

            <span>ویرایش فرد</span>
          </div>

          <h1>ویرایش فرد</h1>
        </div>
      </div>

      <div className="people-form-wrapper">
        <PersonForm
          person={person}
          genders={genders}
          countries={countries}
          cities={cities}
          zodiacSigns={zodiacSigns}
          birthAccuracies={birthAccuracies}
          savePerson={savePerson}
          onSaved={handleSaved}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
