import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  name_eng: "",
  name_arabic: "",
  name_sanskrit: "",
  image: "",
  icon: "",
  symbol: "",
  planet_id: "",
  element_id: "",
  quality_id: "",
};

export default function ZodiacSignForm({
  zodiacSign,
  planets,
  elements,
  qualities,
  onSaved,
  onCancel,
  saveZodiacSign,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(zodiacSign);

  useEffect(() => {
    if (zodiacSign) {
      setForm({
        name: zodiacSign.name || "",
        name_eng: zodiacSign.name_eng || "",
        name_arabic: zodiacSign.name_arabic || "",
        name_sanskrit: zodiacSign.name_sanskrit || "",
        image: zodiacSign.image || "",
        icon: zodiacSign.icon || "",
        symbol: zodiacSign.symbol || "",
        planet_id: zodiacSign.planet_id ? String(zodiacSign.planet_id) : "",
        element_id: zodiacSign.element_id ? String(zodiacSign.element_id) : "",
        quality_id: zodiacSign.quality_id ? String(zodiacSign.quality_id) : "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [zodiacSign]);

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
      ...form,
      planet_id: form.planet_id || null,
      element_id: form.element_id || null,
      quality_id: form.quality_id || null,
    };

    try {
      const savedZodiacSign = await saveZodiacSign(payload);

      onSaved(savedZodiacSign);

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
    <div className="card shadow-sm zodiac-sign-form-card">
      <div className="card-header">
        <h3 className="card-title mb-0">
          {isEditing ? "ویرایش نشانه زودیاک" : "افزودن نشانه زودیاک جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row g-3">
            {/* Name */}
            <div className="col-12 col-md-6">
              <label htmlFor="zodiac-name" className="form-label">
                نام
              </label>

              <input
                id="zodiac-name"
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={handleChange}
                maxLength={20}
                disabled={saving}
              />

              {renderError("name")}
            </div>

            {/* English Name */}
            <div className="col-12 col-md-6">
              <label htmlFor="zodiac-name-eng" className="form-label">
                نام انگلیسی
              </label>

              <input
                id="zodiac-name-eng"
                type="text"
                name="name_eng"
                className={`form-control ${
                  errors.name_eng ? "is-invalid" : ""
                }`}
                value={form.name_eng}
                onChange={handleChange}
                maxLength={20}
                disabled={saving}
                // dir="ltr"
              />

              {renderError("name_eng")}
            </div>

            {/* Arabic */}
            <div className="col-12 col-md-6">
              <label htmlFor="zodiac-name-arabic" className="form-label">
                نام عربی
              </label>

              <input
                id="zodiac-name-arabic"
                type="text"
                name="name_arabic"
                className={`form-control ${
                  errors.name_arabic ? "is-invalid" : ""
                }`}
                value={form.name_arabic}
                onChange={handleChange}
                maxLength={20}
                disabled={saving}
              />

              {renderError("name_arabic")}
            </div>

            {/* Sanskrit */}
            <div className="col-12 col-md-6">
              <label htmlFor="zodiac-name-sanskrit" className="form-label">
                نام سانسکریت
              </label>

              <input
                id="zodiac-name-sanskrit"
                type="text"
                name="name_sanskrit"
                className={`form-control ${
                  errors.name_sanskrit ? "is-invalid" : ""
                }`}
                value={form.name_sanskrit}
                onChange={handleChange}
                maxLength={20}
                disabled={saving}
              />

              {renderError("name_sanskrit")}
            </div>

            {/* Image */}
            <div className="col-12 col-md-4">
              <label htmlFor="zodiac-image" className="form-label">
                مسیر تصویر
              </label>

              <input
                id="zodiac-image"
                type="text"
                name="image"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                value={form.image}
                onChange={handleChange}
                maxLength={255}
                disabled={saving}
                // dir="ltr"
              />

              {renderError("image")}
            </div>

            {/* Icon */}
            <div className="col-12 col-md-4">
              <label htmlFor="zodiac-icon" className="form-label">
                مسیر آیکن
              </label>

              <input
                id="zodiac-icon"
                type="text"
                name="icon"
                className={`form-control ${errors.icon ? "is-invalid" : ""}`}
                value={form.icon}
                onChange={handleChange}
                maxLength={255}
                disabled={saving}
                // dir="ltr"
              />

              {renderError("icon")}
            </div>

            {/* Symbol */}
            <div className="col-12 col-md-4">
              <label htmlFor="zodiac-symbol" className="form-label">
                نماد
              </label>

              <input
                id="zodiac-symbol"
                type="text"
                name="symbol"
                className={`form-control ${errors.symbol ? "is-invalid" : ""}`}
                value={form.symbol}
                onChange={handleChange}
                maxLength={255}
                disabled={saving}
              />

              {renderError("symbol")}
            </div>

            {/* Planet */}
            <div className="col-12 col-md-4">
              <label htmlFor="zodiac-planet" className="form-label">
                سیاره حکمران
              </label>

              <select
                id="zodiac-planet"
                name="planet_id"
                className={`form-select ${
                  errors.planet_id ? "is-invalid" : ""
                }`}
                value={form.planet_id}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="">انتخاب سیاره</option>

                {planets.map((planet) => (
                  <option key={planet.id} value={planet.id}>
                    {planet.name}
                  </option>
                ))}
              </select>

              {renderError("planet_id")}
            </div>

            {/* Element */}
            <div className="col-12 col-md-4">
              <label htmlFor="zodiac-element" className="form-label">
                عنصر
              </label>

              <select
                id="zodiac-element"
                name="element_id"
                className={`form-select ${
                  errors.element_id ? "is-invalid" : ""
                }`}
                value={form.element_id}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="">انتخاب عنصر</option>

                {elements.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>

              {renderError("element_id")}
            </div>

            {/* Quality */}
            <div className="col-12 col-md-4">
              <label htmlFor="zodiac-quality" className="form-label">
                کیفیت
              </label>

              <select
                id="zodiac-quality"
                name="quality_id"
                className={`form-select ${
                  errors.quality_id ? "is-invalid" : ""
                }`}
                value={form.quality_id}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="">انتخاب کیفیت</option>

                {qualities.map((quality) => (
                  <option key={quality.id} value={quality.id}>
                    {quality.name}
                  </option>
                ))}
              </select>

              {renderError("quality_id")}
            </div>
          </div>
        </div>

        <div className="card-footer d-flex gap-2">
          <button
            type="submit"
            className={isEditing ? "btn btn-warning" : "btn btn-primary"}
            disabled={saving}
          >
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
                {isEditing ? "ذخیره تغییرات" : "افزودن نشانه"}
              </>
            )}
          </button>

          {/* {isEditing && ( */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            انصراف
          </button>
          {/* )} */}
        </div>
      </form>
    </div>
  );
}
