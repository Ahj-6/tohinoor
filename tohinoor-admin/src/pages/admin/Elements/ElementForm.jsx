import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  name_eng: "",
  description: "",
};

export default function ElementForm({
  element,
  onSaved,
  onCancel,
  saveElement,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(element);

  useEffect(() => {
    if (element) {
      setForm({
        name: element.name || "",
        name_eng: element.name_eng || "",
        description: element.description || "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [element]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setErrors({});

    try {
      const savedElement = await saveElement(form);

      onSaved(savedElement);

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
    <div className={isEditing ? "card shadow-sm element-form-card-edit" : "card shadow-sm element-form-card-insert"}>
      <div className="card-header">
        <h3 className="card-title mb-0">
          {isEditing ? "ویرایش عنصر" : "افزودن عنصر جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="mb-3">
            <label htmlFor="element-name" className="form-label">
              نام
            </label>

            <input
              id="element-name"
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={handleChange}
              maxLength={50}
              disabled={saving}
            />

            {errors.name?.map((error, index) => (
              <div className="invalid-feedback" key={index}>
                {error}
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="element-name-eng" className="form-label">
              نام انگلیسی
            </label>

            <input
              id="element-name-eng"
              type="text"
              name="name_eng"
              className={`form-control ${errors.name_eng ? "is-invalid" : ""}`}
              value={form.name_eng}
              onChange={handleChange}
              maxLength={50}
              disabled={saving}
              dir="ltr"
            />

            {errors.name_eng?.map((error, index) => (
              <div className="invalid-feedback" key={index}>
                {error}
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="element-description" className="form-label">
              توضیحات
            </label>

            <textarea
              id="element-description"
              name="description"
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              rows="4"
              value={form.description}
              onChange={handleChange}
              disabled={saving}
            />

            {errors.description?.map((error, index) => (
              <div className="invalid-feedback" key={index}>
                {error}
              </div>
            ))}
          </div>
        </div>

        <div className="card-footer d-flex gap-2">
          <button type="submit" className={isEditing ? "btn btn-warning" : "btn btn-primary"} disabled={saving}>
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
                {isEditing ? "ذخیره تغییرات" : "افزودن عنصر"}
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
