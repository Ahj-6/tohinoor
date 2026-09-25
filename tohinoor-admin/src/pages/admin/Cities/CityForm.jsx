import { useEffect, useState } from "react";

const emptyForm = {
  country_id: "",
  name: "",
  name_eng: "",
  latitude: "",
  longitude: "",
};

export default function CityForm({
  city,
  countries,
  onSaved,
  onCancel,
  saveCity,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(city);

  useEffect(() => {
    if (city) {
      setForm({
        country_id: city.country_id ? String(city.country_id) : "",
        name: city.name || "",
        name_eng: city.name_eng || "",
        latitude:
          city.latitude !== null && city.latitude !== undefined
            ? String(city.latitude)
            : "",
        longitude:
          city.longitude !== null && city.longitude !== undefined
            ? String(city.longitude)
            : "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [city]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const renderError = (field) => {
    if (!errors[field]) {
      return null;
    }

    return errors[field].map((error, index) => (
      <div className="invalid-feedback" key={index}>
        {error}
      </div>
    ));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setErrors({});

    const payload = {
      country_id: form.country_id || null,
      name: form.name,
      name_eng: form.name_eng,
      latitude: form.latitude,
      longitude: form.longitude,
    };

    try {
      const savedCity = await saveCity(payload);

      onSaved(savedCity);

      if (!isEditing) {
        setForm(emptyForm);
      }
    } catch (error) {
      const validationErrors = error?.response?.data?.errors;

      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        setErrors({
          general:
            error?.response?.data?.message ||
            "خطایی هنگام ذخیره اطلاعات رخ داد.",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm city-form-card">
      <div className="card-header">
        <h3 className="card-title mb-0">
          {isEditing ? "ویرایش شهر" : "افزودن شهر جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row g-3">
            {/* Country */}
            <div className="col-12 col-md-6">
              <label htmlFor="city-country" className="form-label">
                کشور
              </label>

              <select
                id="city-country"
                name="country_id"
                className={`form-select ${
                  errors.country_id ? "is-invalid" : ""
                }`}
                value={form.country_id}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="">انتخاب کشور</option>

                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name_eng}
                  </option>
                ))}
              </select>

              {renderError("country_id")}
            </div>

            {/* Name */}
            <div className="col-12 col-md-6">
              <label htmlFor="city-name" className="form-label">
                نام شهر
              </label>

              <input
                id="city-name"
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={handleChange}
                maxLength={100}
                disabled={saving}
              />

              {renderError("name")}
            </div>

            {/* English Name */}
            <div className="col-12 col-md-6">
              <label htmlFor="city-name-eng" className="form-label">
                نام انگلیسی
              </label>

              <input
                id="city-name-eng"
                type="text"
                name="name_eng"
                className={`form-control ${
                  errors.name_eng ? "is-invalid" : ""
                }`}
                value={form.name_eng}
                onChange={handleChange}
                maxLength={100}
                disabled={saving}
                dir="ltr"
              />

              {renderError("name_eng")}
            </div>

            {/* Latitude */}
            <div className="col-12 col-md-3">
              <label htmlFor="city-latitude" className="form-label">
                عرض جغرافیایی
              </label>

              <input
                id="city-latitude"
                type="text"
                name="latitude"
                className={`form-control ${
                  errors.latitude ? "is-invalid" : ""
                }`}
                value={form.latitude}
                onChange={handleChange}
                inputMode="decimal"
                disabled={saving}
                dir="ltr"
              />
              {renderError("latitude")}
            </div>

            {/* Longitude */}
            <div className="col-12 col-md-3">
              <label htmlFor="city-longitude" className="form-label">
                طول جغرافیایی
              </label>

              <input
                id="city-longitude"
                type="text"
                name="longitude"
                className={`form-control ${
                  errors.longitude ? "is-invalid" : ""
                }`}
                value={form.longitude}
                onChange={handleChange}
                inputMode="decimal"
                disabled={saving}
                dir="ltr"
              />
              {renderError("longitude")}
            </div>
          </div>
        </div>

        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  aria-hidden="true"
                />
                در حال ذخیره...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-1" />
                {isEditing ? "ذخیره تغییرات" : "افزودن شهر"}
              </>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={saving}
            >
              انصراف
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
