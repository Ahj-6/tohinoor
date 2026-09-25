import { useEffect, useState } from "react";

const emptyForm = {
  code: "",
  name: "",
  name_eng: "",
  description: "",
};

export default function BirthAccuracyForm({
  birthAccuracy,
  onSaved,
  onCancel,
  saveBirthAccuracy,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(birthAccuracy);

  useEffect(() => {
    if (birthAccuracy) {
      setForm({
        code: birthAccuracy.code || "",
        name: birthAccuracy.name || "",
        name_eng: birthAccuracy.name_eng || "",
        description: birthAccuracy.description || "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [birthAccuracy]);

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

    try {
      const savedBirthAccuracy = await saveBirthAccuracy(form);

      onSaved(savedBirthAccuracy);

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
    <div className="card shadow-sm birth-accuracy-form-card">
      <div className="card-header">
        <h3 className="card-title mb-0">
          {isEditing ? "ویرایش دقت تولد" : "افزودن دقت تولد جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row g-3">
            {/* Code */}
            <div className="col-12 col-md-4">
              <label htmlFor="birth-accuracy-code" className="form-label">
                کد
              </label>

              <input
                id="birth-accuracy-code"
                type="text"
                name="code"
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                value={form.code}
                onChange={handleChange}
                maxLength={5}
                disabled={saving}
                // dir="ltr"
              />

              {renderError("code")}
            </div>

            {/* Name */}
            <div className="col-12 col-md-4">
              <label htmlFor="birth-accuracy-name" className="form-label">
                نام
              </label>

              <input
                id="birth-accuracy-name"
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
            <div className="col-12 col-md-4">
              <label htmlFor="birth-accuracy-name-eng" className="form-label">
                نام انگلیسی
              </label>

              <input
                id="birth-accuracy-name-eng"
                type="text"
                name="name_eng"
                className={`form-control ${
                  errors.name_eng ? "is-invalid" : ""
                }`}
                value={form.name_eng}
                onChange={handleChange}
                maxLength={100}
                disabled={saving}
                // dir="ltr"
              />

              {renderError("name_eng")}
            </div>

            {/* Description */}
            <div className="col-12">
              <label
                htmlFor="birth-accuracy-description"
                className="form-label"
              >
                توضیحات
              </label>

              <textarea
                id="birth-accuracy-description"
                name="description"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows="4"
                value={form.description}
                onChange={handleChange}
                disabled={saving}
              />

              {renderError("description")}
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
                {isEditing ? "ذخیره تغییرات" : "افزودن دقت تولد"}
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
